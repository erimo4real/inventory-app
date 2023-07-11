const mongoose = require("mongoose");
const validator = require("validator");


const stokeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter  Name"],
        trim: true,
      },
      description: {
        type: String,
        required: [true, "Please Enter product Description"],
      },
    images: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"],
      },
      totalStock: {
        type: Number,
        required: [true, "Please Enter  Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
      },
      quantity: {
        type: Number,
        required: true,
      },
      itemsRemoved: [
        {
          name: {
            type: String,
            required: [true, "Please Enter  Name"],
            trim: true,
          },
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
          vendor: {
            type: mongoose.Schema.ObjectId,
            ref: "Vendor",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],    
      itemsReturned: [
        {
          name: {
            type: String,
            required: [true, "Please Enter  Name"],
            trim: true,
          },
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
          vendor: {
            type: mongoose.Schema.ObjectId,
            ref: "Vendor",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],   
    vendor: {
        type: mongoose.Schema.ObjectId,
        ref: "Vendor",
        required: true,
      },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    createdAt: {
        type: Date,
        default: Date.now,
      },
});

modules.exports =  mongoose.model("Stoke" , stokeSchema)