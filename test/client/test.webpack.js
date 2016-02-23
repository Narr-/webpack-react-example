import 'babel-polyfill'; // for Generator, this is required

// source files
// exclude ./client/index.js
const srcContext = require.context('../../client/', true, /^(?!\.\/index\.js$).*?\.jsx?$/); // ?
// const srcContext = require.context('../../client/', true, /\.jsx?$/);
// console.log(srcContext.keys());
// console.log(srcContext.keys().length);
srcContext.keys().forEach(srcContext); // https://github.com/webpack/karma-webpack#alternative-usage

// spec files
const testsContext = require.context('./specs/', true, /.+\.spec\.jsx?$/);
testsContext.keys().forEach(testsContext);
