const mongoose = require("mongoose")
const Mongo_uri = "mongodb+srv://yashrajsinh3674:12345@cluster0.oq23ozn.mongodb.net/blogs?retryWrites=true&w=majority"
const connectDb = async()=>{

const connection = await mongoose.connect(Mongo_uri)
if(connection) console.log('Database connected succesfully');
else console.log("data failed")

}

module.exports = {connectDb}