const jwt = require("jsonwebtoken");
const db = require("../models");
const Role = db.role;
const User = db.user;
require('dotenv').config()

secret = process.env.SECRET_OR_KEY;

exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).json({
            message: "No token provided!"
        });
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

exports.isAdmin = async (req, res, next) => {

    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).json({
                message: err
            });
            return;
        }

        Role.find({
                _id: {
                    $in: user.roles
                }
            },
            (err, roles) => {
                if (err) {
                    res.status(500).json({
                        message: err
                    });
                    return;
                }

                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "admin") {
                        next();
                        return;
                    }
                }

                res.status(403).json({
                    message: "Require Admin Role!"
                });
                return;
            }
        );
    });
};