const moongoose = require('mongoose');




const sessionConnecton = () => {


    return moongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // serverApi: ServerApiVersion.v1
        // useFindAndModify: false
    })
}



module.exports = sessionConnecton;