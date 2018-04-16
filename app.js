const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const axios = require('axios');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerHelper('getSimplePrices', () => {
  var apiSimple = 'https://simple.ripley.cl/api/products/2000360530672p';
  axios.get(apiSimple).then((res)=> {
    if(res.data.error){
      throw new Error('SKU not found');
    }
    else{
      var prices = res.data.prices;
      console.log(prices);
      return prices;
    }
  }).catch((e) => {
    if (e.code === 'ENOTFOUND'){
      console.log('Unable to connect to API servers');
    }
    else{
      console.log(e.message);
    }
  });
});

app.set('view engine', 'hbs');

app.get('/*', (req, res) => {
  var sku = req.url.substring(1);
  console.log(sku);
  res.render('test.hbs');
});

app.listen(port, () => {
  console.log('Server is up on port ',port);
});
