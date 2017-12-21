const request = require('supertest');

const app = require('../../server/app');

const config = require('../../server/config');
const log = require('../../server/log');

describe('api /render', () => {
  let server;
  before((done) => {
    app(config, log, (err, _server) => {
      if (err) return done(err);
      server = _server;
      done();
    });
  });

  it('should return a 200 response when a valid request is submitted', () => {
    return request(server)
      .post('/render')
      .set('Accept', 'text/plain')
      .send({
        hello: 'world',
        lessThan: '<world',
        greaterThan: 'world>'
      })
      .expect(200)
      .expect('Content-Type', /octet-stream/);
  });

  it('should return a 400 response when possible non plain text value detected', () => {
    return request(server)
      .post('/render')
      .set('Accept', 'text/plain')
      .send({
        emptyTag: '<>',
      })
      .expect(400)
      .expect('Content-Type', /json/);
  });

  it('should return a 400 response when script injection detected', () => {
    return request(server)
      .post('/render')
      .set('Accept', 'text/plain')
      .send({
        plainInjection: '<script>alert("world");</script>',
      })
      .expect(400)
      .expect('Content-Type', /json/);
  });

  it('should return a 400 response when html encoded script injection detected', () => {
    return request(server)
      .post('/render')
      .set('Accept', 'text/plain')
      .send({
        encodedInjection: '12ruu57%3cscript%3ealert(1)%3c%2fscript%3epelne',
      })
      .expect(400)
      .expect('Content-Type', /json/);
  });
});