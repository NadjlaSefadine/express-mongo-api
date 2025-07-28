# API de Gestion de Produits - Express.js & MongoDB

Une API RESTful simple permettant de gérer une liste de produits, avec connexion à une base de données MongoDB.  
Chaque produit contient un nom, un prix, et un statut de stock limité à trois valeurs spécifiques.

---

## Fonctionnalités

1. Connexion du serveur à MongoDB.
2. Création d’un schéma `productSchema` avec les propriétés :
   - `productName` (String) : Nom du produit
   - `price` (Number) : Prix du produit
   - `stockStatus` (String) : Statut du stock (**uniquement** parmi : `'en stock'`, `'petite stock'`, `'pas en stock'`)
3. Création du modèle `productModel` à partir du schéma.
4. Route `GET /products` : Récupérer tous les produits.
5. Route `GET /products/:id` : Récupérer un produit par son ID.
6. Route `POST /products` : Ajouter un nouveau produit.
7. Route `PATCH /products/:id` : Mettre à jour un produit **sauf** son statut de stock.
8. Route `PATCH /products/:id/:status` : Mettre à jour **uniquement** le statut du stock d’un produit.
9. Route `DELETE /products/:id` : Supprimer un produit.

---

## 🔧 Technologies

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **dotenv**

---
---

## ⚙️ Installation

1. **Cloner le projet :**
   ```bash
   git clone (https://github.com/NadjlaSefadine/express-mongo-api.git)
   cd project
2. Installer les dépendances:
      npm install
3.	Configurer l’environnement :
Créer un fichier
.env à la racine :
 PORT=5000
MONGO_URI=mongodb://localhost:27017/stockDB
4.	Lancer le serveur :
node app.js
Exemples de requetes
GET http://localhost:5000/products
{
  "productName": "Test Produit",
  "price": 19.99,
  "stockStatus": "en stock"
}
POST http://localhost:5000/products

{
    "productName": "Ordinateur Portable Pro",
    "price": 1350.00
}
### Récupère un produit par son ID
GET http://localhost:5000/products/{{productId}}

### Modifie le statut du stock d'un produit
PATCH http://localhost:5000/products/{{productId}}/petite%20stock

### Modifie le nom et le prix d'un produit
PATCH http://localhost:5000/products/{{productId}}
Content-Type: application/json

{
  "productName": "Produit Modifié",
  "price": 29.99
}

### Supprime un produit
DELETE http://localhost:5000/products/{{productId}}
