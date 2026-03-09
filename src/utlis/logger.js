import { createLogger, format, transports } from "winston";

const customFormat = format.combine (
    format.timestamp(),
    format.printf(({timestamp, level, message})=> {
        return `${timestamp} ${level}: ${message}`
    })
);

const logger = createLogger ({
    level: 'debug',
    format: customFormat,
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                customFormat
            )
        }),
        new transports.File({
            filename: 'app.log'
        })
    ]
});

export default logger;