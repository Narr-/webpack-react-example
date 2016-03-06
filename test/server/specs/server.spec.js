import { expect } from 'chai';
import request from 'supertest';
import serverProd, // eslint-disable-line no-unused-vars
{ start } from '../../../server/server.prod';

describe('##### SERVER #### server.prod.js:', () => {
  // console.log(serverProd.__Rewire__);
  // const server = start(false);
  // @ Promise is not resolved in Travis
  let server;
  before((done) => {
    start.then((result) => {
      // console.log(result);
      server = result.server;
      done();
    });
  });
  //
  // after(() => {
  //   // use "process.removeAllListeners('uncaughtException');" to handle below error
  //   // (node) warning: possible EventEmitter memory leak detected.
  //   // 11 uncaughtException listeners added. Use emitter.setMaxListeners() to increase limit.
  //   process.removeAllListeners('uncaughtException');
  //   server.close();
  // });
  // Promise is not resolved in Travis @

  // let server;
  // before((done) => {
  //   const promise = new Promise((resolve) => {
  //     resolve(true);
  //   });
  //   promise.then((result) => {
  //     console.log(result);
  //     server = start(false);
  //     done();
  //   });
  // });

  describe('GET /', () => {
    it('/ should respond with index.html', (done) => {
      request(server)
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect((res) => {
          console.log(res);
          expect(res.text).to.be.a('string');
          expect(res.text).to.have.string('<title>Redux TodoMVC example<\/title>');
        })
        .end((err, res) => { // eslint-disable-line no-unused-vars
          console.log('end..!!!!');
          if (err) {
            return done(err);
          }
          return done();
        });
    });
  });

  describe('GET *', () => {
    it('/merong should respond with 404.html', (done) => {
      request(server)
        .get('/merong')
        .expect('Content-Type', /text\/html/)
        .expect((res) => {
          // console.log(res);
          expect(res.text).to.be.a('string');
          expect(res.text).to.have.string('<title>- ooops! -<\/title>');
        })
        .end((err) => {
          if (err) {
            return done(err);
          }
          return done();
        });
    });
  });
});
