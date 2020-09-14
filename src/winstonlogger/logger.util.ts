import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
const DailyRotateFile = require('winston-daily-rotate-file');



const logger = winston.createLogger();
  
  export class LoggerUtil {

    static getWinstonLogger() {

      const applyLogFormat = winston.format.printf(({ level, message, label, timestamp, context, stack }) => {
        let data =  {
          timestamp,
          level,
          context,
          message,
          stack
        }

        return JSON.stringify(data);        
      });

      const transportFile = new DailyRotateFile({
        filename: 'logs/app-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '30d'
      });

      const transportConsole = new winston.transports.Console({
        format: winston.format.combine(
          winston.format.label({ label: 'right meow!' }),
          winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
          applyLogFormat
        ),
        handleExceptions: true
      });

      const winstonLogger = WinstonModule.createLogger({
        exitOnError: false,
        // ....
        // 3 = error
        // 4 = warn
        // 6 = info
        // ..3, 4
        // 7 = debug
        level: 'info', // then it displays the logs less than or equal to info(see the index).
        format: winston.format.combine(
          winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS.ZZ'}),
          winston.format.label({ label: 'right meow!' }),
          applyLogFormat
        ),
        defaultMeta: {},
        transports: [
          transportFile,
          transportConsole,
        ],
      });

      return winstonLogger;
    }
  }