const URL = 'http://localhost:3000';

module.exports = {
  // before: (browser) => {
  //   console.log('Setting up...');
  // },
  // after: (browser) => {
  //   console.log('Closing down...');
  // },
  // beforeEach: function(browser, done) {
  //   // performing an async operation
  //   setTimeout(function() {
  //     // finished async duties
  //     done();
  //   }, 100);
  // },
  // afterEach: function(browser, done) {
  //   // performing an async operation
  //   setTimeout(function() {
  //     // finished async duties
  //     done();
  //   }, 200);
  // }

  '/ : should have a title, Redux TodoMVC example': (browser) => {
    // console.log(browser.globals); // global variables
    browser.url(URL).getTitle((title) => {
      browser.expect(title).to.equal('Redux2 TodoMVC example');
    });
  },
  '/ : header\'s h1 should have a text, todos': (browser) => {
    browser.expect.element('.todoapp header h1').text.to.equal('todos');
    browser.end(); // this is required to end the task and close the browser
  }
};
