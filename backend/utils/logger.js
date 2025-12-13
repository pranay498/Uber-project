import  winston from ('winston');
const { combine, timestamp, printf, colorize, errors, splat, json } = winston.format;

const customLevels = {
  levels: { fatal: 0, error: 1, warn: 2, info: 3, debug: 4 },
  colors: { fatal: 'bgRed white', error: 'red', warn: 'yellow', info: 'green', debug: 'blue' }
};

winston.addColors(customLevels.colors);

const logFormat = printf(({ level, message, timestamp }) => {
  return JSON.stringify({ time: timestamp, level, message });
});


const logger = winston.createLogger({
  levels: customLevels.levels,
  level: 'info',
  format: combine(
    splat(), // for %s, %d, %j
    colorize({ all: true }),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // show stack if error
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' })
  ]
});

export default logger;