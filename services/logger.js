const winston = require('winston');
const { format } = winston;
const rotateFile = require('winston-daily-rotate-file');

const fs = require('fs');

if (!fs.existsSync("logs")) {
    fs.mkdirSync("logs");
}

module.exports = winston.createLogger({
    level: 'info',
    exitOnError: false,
    format: format.combine(
        format.label({ label: '[my-label]' }),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    transports: [
        new rotateFile({
            level: "info",
            filename: "logs/anuncio_info.log",
            datePattern: 'DD-MM-YYYY',
            maxsize: 5120,
            maxFiles: 10
        }),
        new winston.transports.Console()
    ]
});