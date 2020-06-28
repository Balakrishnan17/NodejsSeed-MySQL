const seq = require('../../config/database');
const Sequelize = require('sequelize');

let schema = seq.define('user', {
    create_date: {
        type: Sequelize.DATE,
        defaultValue: null,

    },
    update_date: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        trim: true
    },
    last_name: {
        type: Sequelize.STRING,
        defaultValue: "",
        trim: true
    },
    email: {
        type: Sequelize.STRING,
        defaultValue: "",
        trim: true,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    phone_number: {
        type: Sequelize.STRING,
        trim: true,
        allowNull: false,
        unique: true
    },
    profile_image: {
        type: Sequelize.STRING,
        defaultValue: "",
    },
    password: {
        type: Sequelize.STRING,
        trim: true,
        allowNull: false,
    },
    date_of_birth: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    status: {
        type: Sequelize.ENUM(['active', 'in_active']),
        defaultValue: "in_active"
    },
    user_type: {
        type: Sequelize.ENUM(['guest', 'admin']),
        defaultValue: "guest"
    }
}, {
    underscored: true,
    timestamps: false,
    freezeTableName: true,
});

schema.sync({
    alter: false
}).then((a) => {
    console.log(a, 'user table created')
}).finally(() => {

})
module.exports = schema;