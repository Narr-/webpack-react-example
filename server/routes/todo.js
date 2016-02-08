import loggerMaker from '../utils/logger';
import { POSTGRESQL_URI } from '../config';
import express from 'express';
import { pgNative as pg } from '../models';
import todoModel from '../models/todo';

const logger = loggerMaker(module);
const router = express.Router(); // eslint-disable-line new-cap

router.route('/:todoId')
  .put((req, res) => {
    pg.connect(POSTGRESQL_URI, (err, client, done) => {
      if (err) {
        logger.error(err);
        res.status(503).json({
          message: 'DB connection Error..!!'
        });
      } else {
        client.query(
          `UPDATE ${todoModel.TODO_TABLE_NAME} SET
          ${todoModel.TODO_TEXT_COLUMN_NAME} = '${req.body.todoText}',
          ${todoModel.TODO_IS_EDITING_COLUMN_NAME} = ${req.body.todoIsEditing},
          ${todoModel.TODO_COMPLETED_COLUMN_NAME} = ${req.body.todoCompleted}
          WHERE ${todoModel.TODO_ID_COLUMN_NAME} = '${req.params.todoId}'
          RETURNING ${todoModel.TODO_ID_COLUMN_NAME};`
          , (queryErr, result) => {
          done();
          if (queryErr) {
            logger.error(queryErr);
            res.status(500).json({
              message: 'Error updating data'
            });
          } else {
            if (result.rowCount < 1) {
              res.json({
                message: 'No matched todo id for UPDATE..!!'
              });
            } else {
              res.json({
                todoId: result.rows[0][todoModel.TODO_ID_COLUMN_NAME],
                message: 'Data updated'
              });
            }
          }
        });
      }
    });
  })
  .delete((req, res) => {
    pg.connect(POSTGRESQL_URI, (err, client, done) => {
      if (err) {
        logger.error(err);
        res.status(503).json({
          message: 'DB connection Error..!!'
        });
      } else {
        client.query(
          `DELETE FROM ${todoModel.TODO_TABLE_NAME}
          WHERE ${todoModel.TODO_ID_COLUMN_NAME} = '${req.params.todoId}'
          RETURNING ${todoModel.TODO_ID_COLUMN_NAME};`
          , (queryErr, result) => {
          done();
          if (queryErr) {
            logger.error(queryErr);
            res.status(500).json({
              message: 'Error deleting data'
            });
          } else {
            if (result.rowCount < 1) {
              res.json({
                message: 'No matched todo id for DELETE..!!'
              });
            } else {
              res.json({
                todoId: result.rows[0][todoModel.TODO_ID_COLUMN_NAME],
                message: 'Data deleted'
              });
            }
          }
        });
      }
    });
  });

export {
  router as todoRouter
};
