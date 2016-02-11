require('babel-core/register');
require('babel-polyfill'); // to use generator to build saga in rendering dom from Server
if (process.env.NODE_ENV === 'production') {
  require('./server.prod');
} else {
  require('./server.dev');
}
