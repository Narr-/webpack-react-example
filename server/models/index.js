import loggerMaker from '../utils/logger';
import { POSTGRESQL_URI } from '../config';
import pg from 'pg';
import { CREATE_TODO_TABLE } from './todo';

const logger = loggerMaker(module);
export const pgNative = pg.native;

// this initializes a connection pool
// it will keep idle connections open for a (configurable) 30 seconds
// and set a limit of 20 (also configurable)
pgNative.connect(POSTGRESQL_URI, (err, client, done) => {
  console.log('pgNative..!! pgNative..!! pgNative..!! pgNative..!!');
  if (err) {
    console.log('pgNative2..!! pgNative2..!! pgNative2..!! pgNative2..!!');
    return logger.error(`error fetching client from pool: ${err}`);
  }
  client.query(CREATE_TODO_TABLE, (queryErr) => {
    // call `done()` to release the client back to the pool
    console.log('pgNative3..!! pgNative3..!! pgNative3..!! pgNative3..!!');
    done();
    if (queryErr) {
      console.log('pgNative4..!! pgNative4..!! pgNative4..!! pgNative4..!!');
      return logger.error(`error running query ${queryErr}`);
    }
  });
});
