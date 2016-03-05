import loggerMaker from './utils/logger';
import { PORT, REDIS_URL } from './config';
import redis from 'redis';
import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import connectRedis from 'connect-redis';
import session from 'express-session';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import path from 'path';
import routers from './routes';
import http from 'http';
import socket from './socket';

console.log('server.prod..!!');
const logger = loggerMaker(module);
const redisClient = redis.createClient(REDIS_URL);
const promise = new Promise((resolve, reject) => {
  console.log('Promise..!!!!');
  let reconTry = 0;

  redisClient.on('connect', () => {
    resolve();
  });

  redisClient.on('error', (err) => {
    logger.error(err);
    if (++reconTry === 3) {
      redisClient.end();
      reject();
    }
  });
});
const app = express();

export default function startApp(useRedis) {
  console.log('start22..@@!!');
  app.use(morgan('combined', {
    stream: logger.stream
  }));
  app.use(compression());
  const sessionObj = {
    secret: 'webpack-react',
    resave: false,
    saveUninitialized: false
  };
  if (useRedis) {
    const RedisStore = connectRedis(session);
    sessionObj.store = new RedisStore({
      client: redisClient
    });
  }
  app.use(session(sessionObj));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: false
  }));

  // @ react dom rendering
  app.set('view engine', 'html');
  app.engine('html', ejs.renderFile);
  app.use(routers.domRenderer);
  // react dom rendering @
  app.get(/^\/*$/, (req, res) => { // handle 'root-url//, root-url///, root-url//// and so on'
    res.sendFile(path.join(__dirname, './views/404.html'));
  });
  app.use(express.static(path.join(__dirname, '../static')));

  app.use('/api', routers.api);
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './views/404.html'));
  });

  const server = http.createServer(app);
  if (useRedis) {
    socket(server);
  }
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

  return server;
}

export const start = promise.then(() => {
  const server = startApp(true);
  return {
    server,
    redis: true
  };
}, () => { // no redis
  const server = startApp(false);
  return {
    server,
    redis: false
  };
});


// test
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
