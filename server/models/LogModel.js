var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var logSchema = new Schema({
    sessionID: {
        type: Schema.Types.ObjectId,
        ref: 'Session'
    },
    title: {
        type: String,
        required: true
    },
    timestamp: {
        type: Schema.Types.Date,
        required: true
    },
    logData: {
        type: String,
        required: true
    }
    //level: {type: String, required: true},
    //message: {type: String, required: true},
    //meta: {type: Schema.Types.Mixed, required: true},
});

module.exports = mongoose.model('logs', logSchema);