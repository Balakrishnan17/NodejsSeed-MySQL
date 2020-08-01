const seq = require('../../config/database');
const Sequelize = require('sequelize');

let schema = seq.define('user_info', {
    create_date: {
        type: Sequelize.DATE,
        defaultValue: null,

    },
    update_date: {
        type: Sequelize.DATE,
        defaultValue: null,
    },
    address_type:{
        type: Sequelize.ENUM(['foreign', 'native']),
        defaultValue: "native"
    }
}, {
    underscored: true,
    timestamps: false,
    freezeTableName: true,
});

schema.sync({
    alter: false
}).then((a) => {
    console.log(a, 'user info table created')
}).finally(() => {

})
module.exports = schema;