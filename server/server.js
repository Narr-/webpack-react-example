import webpackConfig from '../webpack.config';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import { NODE_ENV, PORT } from './config';
import loggerMaker from './util/logger';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import path from 'path';
import http from 'http';

const logger = loggerMaker(module);
const app = express();

app.use(morgan('combined', {
  stream: logger.stream
}));
app.use(compression());

if (NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../static')));
} else {
  const wConfig = webpackConfig({
    dev: true
  });
  const compiler = webpack(wConfig);
  app.use(webpackDevMiddleware(compiler, {
    // quiet: true,
    // publicPath: wConfig.output.publicPath,
    stats: {
      colors: true
    }
  }));
  app.use(webpackHotMiddleware(compiler));
}

const server = http.createServer(app);

server
  .listen(PORT, () => {
    logger.info(`==> 🌎  Listening on port ${PORT}.` +
      ` Open up http:\/\/localhost:${PORT} in your browser.`);
  })
  .on('error', err => {
    if (err.code === 'EADDRINUSE') {
      logger.error('The port is already in use..!!');
    }
  });

export default app;
