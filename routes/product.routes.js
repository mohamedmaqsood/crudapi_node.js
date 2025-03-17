const express = require('express');
const { getproduct, putproduct, postproduct, deleteproduct } = require('../controllers/product.controller');

const router = express.Router();

// Routes for CRUD operations
router.get('/products', getproduct); // Get all products
router.get('/products/:id', getproduct); // Get a specific product by ID
router.post('/products', postproduct); // Create a new product
router.put('/products/:id', putproduct); // Update a product
router.delete('/products/:id', deleteproduct); // Delete a product

module.exports = router;
