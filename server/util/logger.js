import fs from 'fs';
import path from 'path';
import winston from 'winston';

const logDir = path.join(__dirname, '../log');
try {
  fs.accessSync(logDir);
} catch (e) {
  fs.mkdirSync(logDir);
}

export default function (module) {
  const logger = new winston.Logger({
    transports: [
      new winston.transports.Console({
        label: module.filename,
        level: 'debug',
        json: false,
        prettyPrint: true,
        depth: 0,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        colorize: 'all'
      }),
      new winston.transports.File({
        label: module.filename,
        level: 'debug',
        filename: path.join(logDir, '/log.txt'),
        json: false,
        prettyPrint: true,
        depth: 0,
        handleExceptions: true,
        humanReadableUnhandledException: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5
      })
    ],
    exitOnError: false
  });

  logger.level = 'debug';
  logger.stream = {
    write: message => { // message, encoding
      logger.info(message);
    }
  };

  return logger;
}
