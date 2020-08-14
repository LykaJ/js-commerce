const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');
const auth = require('../middleware/auth');

/* TODO: Add auth before function */
router.post('/', auth, productController.createProduct);
router.put('/:id', auth, productController.editProduct);
router.delete('/:id', auth, productController.deleteProduct);
router.get('/:id', productController.productShow);
router.get('/', productController.productList);

module.exports = router;