const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

const port = process.env.PORT || 2000;
const db = process.env.MONGO_DB_URI;

mongoose
  .connect(
    db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("MongoDB successfully connected")
  })
  .catch(err => console.log(err));

app.use(express.json());
const corsOption = 

app.use(
  cors({
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.use(
  session({
    name: 'session',
    secret: process.env.SESSION_KEY,
    saveUninitialized: true,
    resave: false,
    cookie: {
      httpOnly: false,
      maxAge: parseInt(process.env.SESSION_MAX_AGE),
    }
  })
)

app.listen(port, () => {
  console.log(`Server up and running on port ${port} !`)
})


app.use("/", authRoutes);
