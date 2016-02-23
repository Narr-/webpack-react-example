import del from 'del';
import path from 'path';
import webpack from 'webpack';

const coveragePath = path.join(__dirname, 'coverage');
const srcBasePath = path.join(__dirname, '../../client');

export default (config) => {
  del.sync(coveragePath);

  config.set({
    basePath: '',
    browsers: ['PhantomJS'],
    exclude: [],
    files: [
      'test.webpack.js'
    ],
    frameworks: ['mocha', 'chai', 'sinon'],
    plugins: [
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-mocha',
      'karma-chai',
      'karma-sinon',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-coverage'
    ],
    preprocessors: {
      'test.webpack.js': ['webpack', 'sourcemap']
    },
    reporters: ['spec', 'coverage'],
    // singleRun: true, // overriden by gulp task

    coverageReporter: {
      type: 'html',
      dir: coveragePath
    },
    webpack: { // overwrite webpack.config.js
      devtool: 'inline-source-map',
      module: {
        preLoaders: [{
          test: /\.jsx?$/,
          // node_modules is ignored by default
          // https://github.com/btmills/eslint/commit/0f4b0d8d90fd1af7e8310dc1098abb149ccf2107
          // exculde: /node_modules/,
          loaders: ['eslint']
        }],
        loaders: [{
          test: /\.scss$/,
          loader: 'null' // if not specified, warnings occur
        }, {
          test: /\.jsx?$/,
          exclude: [
            /node_modules/,
            srcBasePath
          ],
          loaders: ['babel']
        }, {
          test: /\.jsx?$/,
          include: [
            srcBasePath
          ],
          loaders: ['babel-istanbul?cacheDirectory=true']
        }]
      },
      plugins: [
        new webpack.DefinePlugin({
          // WEBPACK_VAR: {
          //   mode: {
          //     production: false
          //   }
          // }
        })
      ],
      resolve: {
        root: srcBasePath, // for require
        extensions: ['', '.js', '.jsx']
      },
      externals: {
        // @ enzyme https://github.com/airbnb/enzyme/blob/master/docs/guides/karma.md
        cheerio: 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
        // enzyme @
      }
    },
    webpackMiddleware: {
      stats: {
        // With console colors
        colors: true
      }
    },
  });
};
