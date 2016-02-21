require('babel-core/register');
/*
// to use generator to build saga in rendering dom from Server
// replace this to babel-runtime(transform-runtime in .babelrc)
// require('babel-polyfill');
*/
const config = require('./config');
const NODE_ENV = config.NODE_ENV;
if (NODE_ENV === 'gh-pages') {
  require('./server.gh-pages.js');
} else if (NODE_ENV === 'production' || NODE_ENV === 'docker') {
  require('./server.prod');
} else {
  require('./server.dev');
}
