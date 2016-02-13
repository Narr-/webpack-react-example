require('babel-core/register');
/*
// to use generator to build saga in rendering dom from Server
// replace this to babel-runtime(transform-runtime in .babelrc)
// require('babel-polyfill');
*/
const env = process.env;
if (env.NODE_ENV === 'gh-pages') {
  require('./server.gh-pages.js');
} else if (env.NODE_ENV === 'production') {
  require('./server.prod');
} else {
  require('./server.dev');
}
