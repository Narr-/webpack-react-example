// TODO: check later if webpack dev middleware can be used with server rendering
// Because sending response dynamically by react-router, it invokes the below error
// @ Error Msg
// EventSource's response has a MIME type ("text/html") that is not "text/event-stream".
// Aborting the connection.
// Error Msg @
// So as of now, it can't be used for server rendering.

import webpackConfig from '../webpack.config';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import loggerMaker from './utils/logger';
import { PORT } from './config';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import session from 'express-session';
import bodyParser from 'body-parser';
import routers from './routes';
// import path from 'path';
import http from 'http';

const logger = loggerMaker(module);
const app = express();

app.use(morgan('combined', {
  stream: logger.stream
}));
app.use(compression());
app.use(session({
  secret: 'webpack-react',
  resave: false,
  saveUninitialized: false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const serverUrl = `http://localhost:${PORT}/`; // add protocol for url in Blob CSS

// @ webpack
const wConfig = webpackConfig({
  dev: true,
  publicPath: serverUrl, // * The last slash(/) is important
  devMiddleware: true
});
const compiler = webpack(wConfig);
app.use(webpackDevMiddleware(compiler, {
  // quiet: true,
  // publicPath: serverUrl,
  stats: {
    colors: true
  }
}));
app.use(webpackHotMiddleware(compiler));
// webpack @

app.use('/api', routers.api);
app.get('*', (req, res) => {
  res.redirect(serverUrl);
});

const server = http.createServer(app);

server
  .listen(PORT, () => {
    logger.info(`==> 🌎  Listening on port ${PORT}.` +
      ` Open up ${serverUrl} in your browser.`);

    // http.get(serverUrl, (res) => {
    //   res.setEncoding('utf8');
    //   res.on('data', (chunk) => {
    //     logger.info(chunk);
    //     logger.info(typeof chunk);
    //   });
    // }).on('error', (e) => {
    //   logger.error(e);
    // });
  })
  .on('error', err => {
    if (err.code === 'EADDRINUSE') {
      logger.error('The port is already in use..!!');
    }
  });
