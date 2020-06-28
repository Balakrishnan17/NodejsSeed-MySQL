const crypto = require('crypto');
const resizedIV = Buffer.allocUnsafe(16);
const settings = require('../settings');
const environment = require("../config/" + settings.environment);
const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
const saltRounds = 15;

const responce = {

    sucess(res, data) {
        res.status(200).send({
            status: 200,
            message: 'Success',
            data: data || []
        })
    },

    error(res, data, status_code = 400) {
        res.status(400).send({
            status: 400,
            message: 'Error',
            data: data || []
        })
    },

    verifyToken(req, res, next) {
        let tokenSignature = req.headers["auth-token"];

        if (tokenSignature) {
            const verifiedtoken = verifyToken(tokenSignature);
            if (verifiedtoken == "TokenExpiredError") {

                res.status(401).send({
                    status: 401,
                    message: 'Error',
                    data: "Token has expired."
                });
                return;
            } else if (!verifiedtoken) {

                res.status(400).send({
                    status: 400,
                    message: 'Error',
                    data: "Token invalid."
                });
                return;
            }
            req.user_data = verifiedtoken;
            next()
        } else {
            res.status(400).send({
                status: 400,
                message: 'Error',
                data: "User not found."
            });
        }
    },

    getAgeByDateofBirth(dob) {
        const date = new Date();
        const thisYear = date.getFullYear();
        const today = date.valueOf();

        const birthDate = new Date(dob);
        const birthYear = birthDate.getFullYear();

        let age = thisYear - birthYear;

        const checkYearComplete = birthDate.setFullYear(new Date().getFullYear());
        if (checkYearComplete > today) {
            age--;
        }
        return age;
    },

    bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    },

    generateToken(data) {
        try {
            return jwt.sign({
                // exp: Math.floor(moment().add(1, 'd').valueOf() / 1000),
                data: data
            }, environment.TOKEN_KEY, { expiresIn: '1d' });
        } catch (error) {
            console.log("generate token error");
            console.error(error);
            return "";
        }
    },

    encryptPassword(password) {

        return new Promise((resolve, reject) => {
            try {
                bcrypt.hash(password, saltRounds, function (err, hash) {
                    if(err){
                        throw err;
                    }
                    resolve(hash);
                });
            } catch (error) {
                reject(error)
            }
        })
    },

    comparePassword(password,hash) {

        return new Promise((resolve, reject) => {
            try {
                bcrypt.compare(password, hash, function (err, result) {
                    if(err){
                        throw err;
                    }
                    resolve(result);
                });
            } catch (error) {
                reject(error)
            }
        })
    }
}

function verifyToken(token) {
    try {
        return jwt.verify(token, environment.TOKEN_KEY);
    } catch (error) {
        console.log("verify token error");
        console.error(error);
        if (error && error.name == "TokenExpiredError") {
            return "TokenExpiredError"
        } else {
            return "";
        }
    }
}

module.exports = responce