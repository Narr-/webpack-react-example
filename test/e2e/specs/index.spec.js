// difficult to use console.log
describe('/', () => {
  const URL = 'http://localhost:3000';
  // before((client, done) => {
  //   done();
  // });

  // beforeEach((client, done) => {
  //   done();
  // });

  // afterEach((client, done) => {
  //   done();
  // });

  after((client, done) => { // this is required to end the task and close the browser
    client.end(() => {
      done();
    });
  });

  it('should have a title, Redux TodoMVC example', (client) => {
    // console.log(client.globals);
    client
      .url(URL)
      .getTitle((title) => {
        client.expect(title).to.equal('Redux TodoMVC example');
      });
  });

  it('header\'s h1 should have a text, todos', (client) => {
    client
      .url(URL)
      .expect.element('.todoapp header h1').text.to.equal('todos');
  });
});
