const service = require('./auth.service')
const moment = require('moment-timezone')
const utility = require('../../utils/utility')

module.exports = {

    getUser: async (req, res) => {
        try {

            const email = req.params.username;
            const password = req.params.password;
            if (!email) {
                utility.error(res, "Invalid Email");
            }

            if (!password) {
                utility.error(res, "Invalid Password");
            }

            const userData = await service.getUserByEmail(email);

            if (userData && !(userData.length > 0)) {
                utility.error(res, "User does not excist, please check the username.");
                return;
            }

            const checkPassword = await utility.comparePassword(password, userData[0].password);
            if (!checkPassword) {
                utility.error(res, "Please check the password.");
                return;
            }

            if (userData[0].status != "active") {
                utility.error(res, "Please activate your account.");
                return;
            }


            let data = {
                _id: userData[0]._id,
                first_name: userData[0].first_name,
                last_name: userData[0].last_name,
                email: userData[0].email,
                phone_number: userData[0].phone_number,
                date_of_birth: moment(userData[0].date_of_birth).format("DD-MM-YYYY"),
                status: userData[0].status,
                user_type: userData[0].user_type
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
            userData.date_of_birth = moment(userData.date_of_birth, "DD-MM-YYYY");
            userData.password = await utility.encryptPassword(userData.password);
            const save = await service.saveUser(userData);
            utility.sucess(res, "")
        } catch (error) {
            console.log("Create User Error");
            console.error(error);
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