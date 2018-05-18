const express = require('express');
const app = express();
const bodyParser = require('body-parser');
global.mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/the_magazine_store');
app.use(bodyParser.json());

// MODELS
const Product = require('./models/product.js');


// ROUTES

// serve frontend files (excluded from ACL)
app.use(express.static('../client/'));

app.get('/rest/products', async(req, res)=>{
  //res.send('We are products');
  let products = await Product.find(); // {name:"The Times"}
  res.json(products);
});

app.post('/rest/products', async(req, res)=>{
  //res.send('We would create a product');
  let product = await new Product(req.body);
  try{
    product.save();
  }catch(e){
    console.error(e);
  }
  res.json(product);
});

app.put('/rest/products/:id', async(req, res)=>{
  //res.send('We would update a product');

  // get the product from the db
  let product = await Product.findOne({_id: req.params.id});
  // perform update
  let result = await product.update(req.body);
  if(result.ok){
    result = req.body;
  }
  res.json(result);
});

app.delete('/rest/products', (req, res)=>{
  res.send('We would delete a product');
});

app.listen('3000', ()=>{
  console.log('The magazine store server is running on port 3000');
});
