const mongoose = require("mongoose");
const categoryProductSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: true
    },
    description:{
        type: String,
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
const CategoryProduct = mongoose.model("CategoryProduct", categoryProductSchema);
module.exports = CategoryProduct;