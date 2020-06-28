
const responce ={
    sucess(res,data){
        res.status(200).send({
            status:200,
            message:'Success',
            data: data || []
        })
    },
    error(res,data){
        res.status(400).send({
            status:400,
            message:'Error',
            data: data || []
        })
    }
}

module.exports = responce