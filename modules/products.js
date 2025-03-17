const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter the product name"]
        },

        roll_number : {
            type: Number,
            required: true,
            default: 0
        },

        college: {
            type: String,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    },
    
)

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;