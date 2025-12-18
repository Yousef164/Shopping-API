const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    product: {
        type: Array
    }
});

module.exports = mongoose.model('Order', orderSchema);