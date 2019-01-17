const express = require('express'),
 router = express.Router(),
 searchController = require("../controllers/product-search.js");



 router.get('/',searchController.products_search);

 module.exports = router;