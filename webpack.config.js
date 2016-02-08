import del from 'del';
import path from 'path';
const appPath = path.join(__dirname, 'client');
const distPath = path.join(__dirname, 'static');
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Sprite from 'sprite-webpack-plugin';

export default function ({ dev }) {
  del.sync('./temp');

  const config = {
    customObj: {
      appPath
    },
    context: appPath, // for resolving the entry option
    entry: {
      vendor: [
        'bootstrap-sass/assets/stylesheets/_bootstrap.scss',
        'babel-polyfill', // to use generator
        'react', 'react-dom', 'react-redux', 'redux', 'immutable',
        'react-router', 'react-router-redux', 'redux-saga', 'isomorphic-fetch',
        'redux-form',
        'classnames', 'humps', 'node-uuid'
      ],
      main: ['./index.js']
    },
    output: {
      path: distPath,
      filename: '[name].bundle.js?[hash]',
      chunkFilename: '[name].js?[hash]'
    },
    module: {
      preLoaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['eslint']
      }],
      loaders: [{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', [`css${dev ? '?sourceMap' : ''}`,
          'postcss', 'resolve-url', 'sass']) // https://github.com/bholloway/resolve-url-loader
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=10000&name=res/imgs/[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7' // https://github.com/tcoopman/image-webpack-loader#bypassondebug-all
        ]
      }, {
        test: /\.ico$/,
        loaders: [
          'url?limit=10000&name=res/imgs/[name].[ext]?[hash]',
          'image-webpack?bypassOnDebug&optimizationLevel=7'
        ]
      }, {
        test: /\.(woff|woff2|ttf|otf|svg|eot)(\?.*?)?$/,
        loader: 'url?limit=10000&name=res/fonts/[name].[ext]?[hash]'
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel'] // the queries are included by .babelrc
      }]
    },
    eslint: {
      // errors are displayed by default as warnings
      // set emitErrors to true to display them as errors
      emitErrors: true,
      // to not interrupt the compilation
      // if you want any file with jshint errors to fail
      // set failOnHint to true
      failOnHint: true
    },
    sassLoader: {
      sourceMap: true // https://github.com/sass/node-sass#options, this should be true to use resolve-url-loader
    },
    postcss: () => [autoprefixer({ browsers: 'last 2 versions' })],
    plugins: [
      new ExtractTextPlugin('[name].bundle.css?[contenthash]'), // https://github.com/webpack/extract-text-webpack-plugin#api
      new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', // https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
        /* filename= */'[name].bundle.js?[hash]'),
      new webpack.DefinePlugin({
        // https://facebook.github.io/react/docs/getting-started.html
        // by default, React will be in development mode, which is slower,
        // and not advised for production. To use React in production mode,
        // set the environment variable NODE_ENV to production
        'process.env': {
          NODE_ENV: dev ? JSON.stringify('development') : JSON.stringify('production')
        },
        WEBPACK_VAR: {
          mode: {
            production: !dev
          }
        }
      }),
      new HtmlWebpackPlugin({
        minify: dev ? '' : {
          minifyCSS: true,
          minifyJS: true,
          removeComments: true,
          collapseWhitespace: true
        },
        template: path.join(appPath, 'index.html'),
        forEjs: {
          reactDom: '<%= reactDom %>',
          reduxState: '<%= reduxState %>'
        }
      }),
      new Sprite({
        source: path.join(appPath, 'res/imgs/icons/'),
        imgPath: path.join(__dirname, 'temp/res/imgs/icons/'),
        cssPath: path.join(__dirname, 'temp/res/imgs/icons/'),
        processor: 'scss',
        bundleMode: 'multiple',
        prefix: 'sprite-icon'
      })
    ],
    resolve: {
      root: appPath, // for require
      extensions: ['', '.js', '.jsx']
    }
  };

  if (dev) {
    config.devtool = 'source-map';
    config.debug = true; // Switch loaders to debug mode.
    // @ https://github.com/glenjamin/webpack-hot-middleware
    config.entry.vendor.push('webpack-hot-middleware/client?reload=true');
    config.entry.main.push('webpack-hot-middleware/client?reload=true');
    // config.output.publicPath = publicPath; // https://webpack.github.io/docs/configuration.html#output-publicpath, for url in Blob CSS
    config.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NoErrorsPlugin());
    // https://github.com/glenjamin/webpack-hot-middleware @
  } else {
    config.bail = true; // Report the first error as a hard error instead of tolerating it.
    config.plugins.push(new webpack.optimize.DedupePlugin()); // https://github.com/webpack/docs/wiki/optimization#deduplication
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      // comments: false
      // beautify: true,
      // mangle: false
    }));
  }

  return config;
}
