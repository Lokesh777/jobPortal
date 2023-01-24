require("dotenv").config();

const mongoose = require("mongoose");

const connect = () =>{

    mongoose.set("strictQuery",false);

    return mongoose.connect(process.env.MONGODB_URl,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    },
    (error)=>{
        if(error){
            console.log("Error in connections !")
        }else{
            console.log("Connection established")
        }
    }
    
    )

}

module.exports = connect;

