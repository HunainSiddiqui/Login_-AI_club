const mongoose = require("mongoose") ;

const connectDB = async() => {
    try{
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGO_URL) ;
        console.log("Connected_to_MongoDB") ;
    }
    catch(err){
        console.log(err) ;
    }
};

module.exports = connectDB ;