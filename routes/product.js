const router = require("express").Router();
const Product = require("../models/product");

router.get('/', (req, res, next) => {
    Product.find({})
    .select('_id productName productPrice')
    .then(products => {
        const result = products.map(product => {
            return {
                productName: product.productName,
                productPrice: product.productPrice,
                URL: {
                    type: 'Get',
                    urls : `http://localhost:3000/products/${product._id}`
                }
            }
        })
        res.status(200).json({
            message: 'Products fetched successfully',
            products: result,
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err.message
        })
    })
});

router.post('/addProduct', (req, res, next) => {
    const product = new Product({
        productName: req.body.productName,
        productPrice: req.body.productPrice
    });
    product.save()
    .then(result => {
        res.status(201).json({
            message: 'Product added successfully',
            product: result
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
});

router.get('/:productId', (req, res,next) => {
    Product
    .findOne({ _id: req.params.productId })
    .select('productName productPrice')
    .then(result => {
        if(result) {
            res.status(200).json({
                message: 'Product fetched successfully',
                product: result
            });
        }
        else {
            res.status(404).json({
                message: 'Product not found'
            });
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err.message
        });
    });
});

module.exports = router;