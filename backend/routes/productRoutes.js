const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');
const auth = require('../middleware/auth');

router.post('/', auth, productController.createProduct);
router.put('/:id', auth, productController.editProduct);
router.delete('/:id', auth, productController.deleteProduct);
router.get('/:id',auth, productController.productShow);
router.get('/', auth, productController.productList);

module.exports = router;