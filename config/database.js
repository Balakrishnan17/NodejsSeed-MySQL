const mongoose = require('mongoose');
const settings = require('../settings');
const databaseCre = require("./" + settings.environment)

const mongooseConnect = {
    connectDb: async () => {
        try {
            await mongoose.connect("mongodb://" + databaseCre.DATABASE.ip + "/seed", { useUnifiedTopology: true,useNewUrlParser: true,useCreateIndex: true });
            //console.log('Mongoose Connected Successfully');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = mongooseConnect