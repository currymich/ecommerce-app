var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var Cart = require('../models/cart.js')
var Product = require('../models/product.js')

router.get('/', function(req, res){
  console.log('hit carts controller!')
})


module.exports = router;
