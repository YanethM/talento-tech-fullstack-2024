const mongoose = require("mongoose");
const categoryProduct = require("./productCategory");
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: categoryProduct,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})
const Product = mongoose.model("Products", productSchema);
module.exports = Product;