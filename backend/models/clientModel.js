const mongoose = require("mongoose");
const validator = require("validator");

const clientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please Enter Your frist Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    }, 
    lastname: {
        type: String,
        required : [true , "Please Enter Your last Name" ],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    phone:{
        type: int, 
        required: [true, "Please Enter Your Phone Number"],
    },
    gender: {
        type :String,
        required: [true, "Please Enter Your Gender"],
    },
    company : {
        type : String,
        required: [true, "Please Enter Your company Name"],
    },
    sitecategory : {
        type : String, 
        required: [true, "Please Enter Your category"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

modules.exports =  mongoose.model("Client" , clientSchema)