const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

const routers = require('./routes');

const utility = require('./utils/utility')

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, auth-token, X-Requested-With,Content-Type, Accept,Autorization");

    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,PATCH,DELETE")
        return res.status(200).send({});
    }

    var ip = req.ip ||
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;        
    // Your allowed ip. You can also check against an array
    if (ip == '127.0.0.1' || ip == "localhost" || ip == "192.168.137.1") {
        next();
    } else {
        utility.error(res,"You are not access to this site.",404);
    }
})

routers.forEach((element) => {
    app.use('/api', element)
})

app.use((req, res, next) => {
    const error = new Error('Not Found')
    console.log(error.message);
    utility.error(res,error.message,404);
})

module.exports = app