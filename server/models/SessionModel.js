const mongoose = require("mongoose");
var mongoosePaginate = require('mongoose-paginate');


const Schema = mongoose.Schema;
// Create Schema
const SessionSchema = new Schema({
    userID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
    }],
    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

SessionSchema.plugin(mongoosePaginate);
module.exports = Session = mongoose.model("sessions", SessionSchema);