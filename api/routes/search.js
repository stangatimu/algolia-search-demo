const express = require('express'),
 router = express.Router(),
 searchController = require("../controllers/product-search.js");


//path can be as:
//  /search?query='keyword'&page=0&per=12


// query= the word/phrase you want to search
//page = the page you want to search
//per = how products you want retuned per page, default is 10
 router.get('/',searchController.products_search);

 module.exports = router;