const mongoose = require("mongoose");
const shoppingCarSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const ShoppingCar = mongoose.model("ShoppingCar", shoppingCarSchema);
module.exports = ShoppingCar;