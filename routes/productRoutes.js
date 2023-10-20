const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

router.get('/', (req, res) => {
    productController.getProducts()
        .then((productsData) => res.json(productsData))
        .catch((error) => res.status(500).send('Erro ao obter produtos'))
})

router.get('/:id', (req, res) => {
    const IdRecebido = req.params.id;
    productController.getProductById(IdRecebido)
        .then((productRecebido) => {
            if(productRecebido){
                res.status(200).send(productRecebido);
            } else {
                res.status(404).send('Produto não encontrado');
            }
        })
        .catch((error) => res.status(500).send())
})

router.get('/search/:name', (req, res) => {
    const productName = req.params.name;
    productController.searchProductByName(productName)
        .then((products) => {
            if(products){
                res.status(200).send(products)
            } else {
                res.status(404).send('Jhon Travoltas time!!!!')
            }
        })
        .catch((error) => res.status(500).send())
})


module.exports = router;