import loggerMaker from './utils/logger';
import { REDIS_URL } from './config';
import io from 'socket.io';
import redis from 'redis';
import redisSocket from 'socket.io-redis';

const logger = loggerMaker(module);
export let socketIo = null;

export default (server) => {
  if (socketIo === null) {
    socketIo = io.listen(server);

    // when socket.io-redis connects to url with protocol(redis),
    // it causes an error so using pubClient, subClient
    socketIo.adapter(redisSocket({ // http://socket.io/docs/using-multiple-nodes/#using-node.js-cluster
      pubClient: redis.createClient(REDIS_URL),
      subClient: redis.createClient(REDIS_URL, {
        return_buffers: true // https://github.com/socketio/socket.io-redis/issues/17
      })
    }));

    socketIo.on('connection', (socket) => {
      logger.info(`socket id: ${socket.id} is connected..!!`);

      socket.on('join', (data) => {
        socket.join(data.dataObj.userId, (err) => {
          logger.info(`socket id: ${socket.id} has joined to room, ${data.dataObj.userId}..!!`);
          if (err) {
            logger.error(err);
          }
        });
      });

      socket.on('dbChange', (data) => {
        logger.info(data);
        // Msg will only be broadcasted to sockets that have joined the given room except the caller
        socket.to(data.dataObj.userId).emit('dbChange', data);
      });
    });
  }
};
