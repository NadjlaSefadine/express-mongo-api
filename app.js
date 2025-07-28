const express = require('express');
const connectDB = require('./config/db');
const Product = require('./models/product');
require('dotenv').config(); 

const app = express();

// 1
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Express pour la gestion des produits');
});


// 4. 
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 5.
app.get('/products/:id', async (req, res) => {
 
});

 // 6.
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product); // 201 Created
    } catch (error) {
        // Gère les erreurs de validation Mongoose
        if (error.name === 'ValidationError') {
            let errors = {};
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
            return res.status(400).json({ message: 'Erreur de validation', errors });
        }
        res.status(500).json({ message: error.message });
    }
});

// 8.
app.patch('/products/:id/:status', async (req, res) => {
  try {
      const { id, status } = req.params;
      const allowedStatuses = ['en stock', 'petite stock', 'pas en stock'];
      if (!allowedStatuses.includes(status)) {
          return res.status(400).json({ message: `Statut de stock invalide: "${status}". Doit être "en stock", "petite stock" ou "pas en stock".` });
      }
      // Vérifiez que le champ dans le modèle est bien stockStatus
      const updatedProduct = await Product.findByIdAndUpdate(id, { stockStatus: status }, { new: true, runValidators: true });
      if (!updatedProduct) {
          return res.status(404).json({ message: `Produit avec l'ID ${id} non trouvé.` });
      }
      res.status(200).json(updatedProduct);
  } catch (error) {
      if (error.name === 'CastError') {
          return res.status(400).json({ message: `ID de produit invalide: ${req.params.id}` });
      }
      if (error.name === 'ValidationError') {
          let errors = {};
          Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
          });
          return res.status(400).json({ message: 'Erreur de validation', errors });
      }
      res.status(500).json({ message: error.message });
  }
});

// 7.
app.patch('/products/:id', async (req, res) => {
  try {
      const { id } = req.params;
      const { productName, price } = req.body;
      const updateFields = {};
      if (productName !== undefined) updateFields.productName = productName;
      if (price !== undefined) updateFields.price = price;
      if (Object.keys(updateFields).length === 0) {
          return res.status(400).json({ message: 'Aucun champ valide (productName, price) fourni pour la mise à jour.' });
      }
      const updatedProduct = await Product.findByIdAndUpdate(id, updateFields, { new: true, runValidators: true });
      if (!updatedProduct) {
          return res.status(404).json({ message: `Produit avec l'ID ${id} non trouvé.` });
      }
      res.status(200).json(updatedProduct);
  } catch (error) {
      if (error.name === 'CastError') {
          return res.status(400).json({ message: `ID de produit invalide: ${req.params.id}` });
      }
      if (error.name === 'ValidationError') {
          let errors = {};
          Object.keys(error.errors).forEach((key) => {
              errors[key] = error.errors[key].message;
          });
          return res.status(400).json({ message: 'Erreur de validation', errors });
      }
      res.status(500).json({ message: error.message });
  }
});

// 9
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: `Produit avec l'ID ${id} non trouvé.` });
        }
        res.status(200).json({ message: 'Produit supprimé avec succès.', product: deletedProduct });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: `ID de produit invalide: ${req.params.id}` });
        }
        res.status(500).json({ message: error.message });
    }
});
// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur Express démarré sur le port ${PORT}`);
});