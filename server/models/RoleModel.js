const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    name: {
        type: String,
        enum: ["admin", "user"],
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("roles", roleSchema);