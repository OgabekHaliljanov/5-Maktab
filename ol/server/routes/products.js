const { Router } = require('express');

const product = Router();
const { getProducts,
    createProduct,
    deleteProducts,
    getUserById,
    UpdateProducts, saleProducts } = require('../controller/Products');

product.get("/getProducts", getProducts);
product.post("/createProduct", createProduct);
product.delete("/deleteProducts/:id", deleteProducts);
product.get("/getUserById/:id", getUserById);
product.put("/updateProducts/:id", UpdateProducts);
product.put("/saleProducts/:id/:count", saleProducts);
module.exports = product;





