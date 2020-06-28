const seedModal = require('./auth.model');

const service ={

    saveUser: async(data)=>{
        try {
            const saveSeed = await seedModal.create(data)
            return saveSeed
        } catch (error) {
            throw error
        }
    },

    getUserByEmail: async(email)=>{
        try {
            const saveSeed = await seedModal.find({email:email});
            return saveSeed
        } catch (error) {
            throw error
        }
    }
}

module.exports = service