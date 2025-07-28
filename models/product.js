const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Le nom du produit est requis.'],
        trim: true,
        minlength: [3, 'Le nom du produit doit contenir au moins 3 caractères.']
    },
    price: {
        type: Number,
        required: [true, 'Le prix du produit est requis.'],
        min: [0, 'Le prix ne peut pas être négatif.']
    },
    stockStatus: {
        type: String,
        required: [true, 'Le statut du stock est requis.'],
        enum: {
            values: ['en stock', 'petite stock', 'pas en stock'],
            message: 'Le statut du stock doit être "en stock", "petite stock" ou "pas en stock".'
        }
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;