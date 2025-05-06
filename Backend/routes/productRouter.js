const express = require('express');
const { createProduct, getProductById, deleteProduct, updateProduct, getAllProducts } = require('../controllers/productController');
const router = express.Router();

router.post('/create-product', createProduct)
router.get('/all-products', getAllProducts)
router.get('/getProduct/:id', getProductById)
router.delete('/product/:id', deleteProduct)
router.put('/product/:id', updateProduct)


module.exports = router;


