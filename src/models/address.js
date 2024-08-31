const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    nomenclature:{
        type: String,
        required: true
    },
    zip:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})
const Address = mongoose.model("Address", addressSchema);
module.exports = Address;