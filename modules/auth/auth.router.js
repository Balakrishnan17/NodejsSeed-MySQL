const express = require('express')
const router = express.Router()
const verifyToken = require('../../utils/utility').verifyToken;
const utility = require('../../utils/utility')
const Joi = require('joi');

const controller = require('./auth.controller')

router.get('/verify/user/authentication', verifyToken, (req, res) => {
    utility.sucess(res, req.user_data);
});

router.get('/login/user/:username/:password', controller.getUser)

router.post('/create/user', controller.createUser)

module.exports = router