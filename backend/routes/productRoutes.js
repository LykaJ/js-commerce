const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');

router.post('/', productController.createProduct);
router.put('/:id', productController.editProduct);
router.delete('/:id', productController.deleteProduct);
router.get('/:id', productController.productShow);
router.get('/', productController.productList);

module.exports = router;