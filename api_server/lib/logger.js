'use strict';
import winston from 'winston');
import config from 'config');

let level = config.get('log.level');
let logger = new winston.Logger({
  transports: [
    new winston.transports.Console({'timestamp': true, level: level})
  ]
});

export default logger;
