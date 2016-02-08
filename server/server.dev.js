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
import path from 'path';
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

// @ webpack
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
// webpack @

app.use('/api', routers.api);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../static', 'index.html'));
});

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
