const {
    createLogger,
    transports,
    format
} = require("winston")
require('dotenv').config();
require('winston-mongodb');

const logger = createLogger({
    transports: [
        new transports.Console({
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(), format.json())
        }),
        new transports.MongoDB({
            level: 'info',
            db: process.env.MONGO_DB_URI,
            options: {
                useUnifiedTopology: true
            },
            collection: 'logs',
            format: format.combine(format.timestamp(), format.json())
        })
    ]
})

module.exports = logger;