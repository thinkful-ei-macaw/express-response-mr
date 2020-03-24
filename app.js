const express = require('express');
const playstore = require('./playstore');



const app = express();

app.get('/apps', (req, res) => {
  res
    .status(200)
    .json(playstore);

});






app.listen('8080');




