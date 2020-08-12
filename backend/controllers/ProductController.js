const Product = require('../models/Product');

exports.createProduct = (req, res) => {
    let product = new Product({
        ...req.body
    });
    product.save()
        .then(product => res.status(201).json({product, message: 'The product was successfully created'}))
        .catch(error => res.status(400).json({error}));
};

exports.editProduct = (req, res) => {
    Product.updateOne({_id: req.params.id}, {...req.body, _id: req.params.id})
        .then(product => res.status(200).json({product, message: 'The product was successfully updated'}))
        .catch(error => res.status(400).json({error}));
};

exports.deleteProduct = (req, res) => {
    Product.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'The product was successfully deleted'}))
        .catch(error => res.status(400).json({error}));
};

exports.productShow = (req, res) => {
    Product.findOne({_id: req.params.id})
        .then(product => res.status(200).json({product}))
        .catch(error => res.status(404).json({error}));
};

exports.productList = (req, res) => {
    Product.find()
        .then(products => res.status(200).json({products}))
        .catch(error => res.status(400).json({error}))
};