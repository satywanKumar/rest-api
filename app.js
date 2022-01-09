const express = require('express');
const app = express();
const productRoute = require('./api/routes/product');
const userRoute = require('./api/routes/user');
const categorypath = require('./api/routes/category')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded, json } = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

mongoose.connect('mongodb+srv://sribstech:satywan123@sribstech.gpk49.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true});

mongoose.connection.on('error',err=>{
  console.log('connection failed');
});

mongoose.connection.on('connected',()=>{
  console.log('connected successfully with database');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(fileUpload({
  useTempFiles:true
}))

app.use(cors());

app.use('/product',productRoute);
app.use('/user',userRoute);
app.use('/category',categorypath);

app.use((req,res,next)=>{
  res.status(404).json({
    error:'bad request'
  })
})

module.exports = app;
