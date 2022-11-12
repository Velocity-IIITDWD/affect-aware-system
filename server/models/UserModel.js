const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
    }
  ],
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

module.exports = User = mongoose.model("users", UserSchema);