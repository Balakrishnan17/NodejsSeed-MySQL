const moment = require('moment-timezone');
const Joi = require('joi');

const service = require('./auth.service');
const utility = require('../../utils/utility');

const JoiSchema = require('../joischema');
const joiSchema = new JoiSchema();
module.exports = {

    getUser: async (req, res) => {
        try {
            const bodydata = req.body;
           
            const value = Joi.attempt(bodydata,joiSchema.loginSchema());

            const userData = await service.getUserByEmail(value.username);

            if (userData) {
                utility.error(res, "User does not excist, please check the username.");
                return;
            }

            const checkPassword = await utility.comparePassword(value.password, userData.password);
            if (!checkPassword) {
                utility.error(res, "Please check the password.");
                return;
            }

            if (userData.status != "active") {
                utility.error(res, "Please activate your account.");
                return;
            }


            let data = {
                _id: userData._id,
                first_name: userData.first_name,
                last_name: userData.last_name,
                email: userData.email,
                phone_number: userData.phone_number,
                date_of_birth: moment(userData.date_of_birth).format("DD-MM-YYYY"),
                status: userData.status,
                user_type: userData.user_type
            }

            const token = utility.generateToken(data);
            data.token = token;

            utility.sucess(res, data)
        } catch (error) {
            console.log("Login error");
            console.error(error);
            utility.error(res, error)
        }
    },

    createUser: async (req, res) => {
        try {
            const userData = req.body;
            const value = Joi.attempt(userData,joiSchema.singInSchema());

            value.date_of_birth = moment(value.date_of_birth, "DD-MM-YYYY");
            value.password = await utility.encryptPassword(value.password);
            const save = await service.saveUser(value);
            utility.sucess(res, "")
        } catch (error) {
            console.log("Create User Error");
            console.error(error.message);
            utility.error(res, error)
        }
    },

    testing: async (req, res) => {
        try {
            utility.sucess(res, {})
        } catch (error) {
            console.log(error);
            utility.error(res, error)
        }
    }
}