import loggerMaker from '../utils/logger';
import { POSTGRESQL_URI } from '../config';
import express from 'express';
import timeout from 'connect-timeout';
import { pgNative as pg } from '../models';
import todoModel from '../models/todo';
import uuid from 'node-uuid';

import { todosRouter } from './todos';

const logger = loggerMaker(module);
const router = express.Router(); // eslint-disable-line new-cap

router.use(timeout('5s'));

router.post('/', (req, res) => {
  pg.connect(POSTGRESQL_URI, (err, client, done) => {
    if (err) {
      logger.error(err);
      res.status(503).json({
        message: 'DB connection Error..!!'
      });
    } else {
      let userId;

      if (req.body.userId) {
        userId = true;
        if (req.session) {
          req.session.userId = req.body.userId; // eslint-disable-line no-param-reassign
        }
      } else if (req.session && req.session.userId) {
        userId = req.session.userId;
      }

      if (userId) {
        if (userId === true) {
          res.json({
            message: 'hooray! welcome to our api!'
          });
        } else {
          res.json({
            userId,
            message: 'hooray! welcome to our api!'
          });
        }
        done(); // should call done() to release a client to the pool of pg
      } else {
        client.query(
          `SELECT ${todoModel.USER_ID_COLUMN_NAME}
          FROM ${todoModel.TODO_TABLE_NAME}
          WHERE ${todoModel.USER_IP_COLUMN_NAME} = '${req.ip}'
          ORDER BY ${todoModel.TODO_KEY_COLUMN_NAME} DESC;`
          , (queryErr, result) => {
          done();
          if (queryErr) {
            logger.error(queryErr);
            res.status(500).json({
              message: 'Error fetching userId'
            });
          } else {
            if (result.rowCount < 1) {
              userId = uuid.v1();
              if (req.session) {
                req.session.userId = userId; // eslint-disable-line no-param-reassign
              }
              res.json({
                userId,
                message: 'hooray! welcome to our api! New User Id'
              });
            } else {
              userId = result.rows[0][todoModel.USER_ID_COLUMN_NAME];
              if (req.session) {
                req.session.userId = userId; // eslint-disable-line no-param-reassign
              }
              res.json({
                userId,
                message: 'hooray! welcome to our api! retrieved userId'
              });
            }
          }
        });
      }
    }
  });
});

router.use('/todos', todosRouter);

export {
  router as apiRouter
};
