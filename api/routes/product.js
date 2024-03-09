const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Product = require('../model/product');
const cloudinary = require('cloudinary').v2;
const checkAuth = require('../middleware/check-auth')

cloudinary.config({
  cloud_name:'',
  api_key:'',
  api_secret:''
});


// get all products
router.get('/',checkAuth,(req,res,next)=>{
  Product.find()
  .select('_id title productCode description price ctgry photo')
  .then(result=>{
    res.status(200).json({
      product:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
});

//get single product by id
router.get('/:id',checkAuth,(req,res,next)=>{
  const _id = req.params.id;
  Product.findById(_id)
  .select('_id title productCode description price ctgry photo')
  .then(result=>{
    // console.log(result)
    res.status(200).json({
      product:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
})

// return data by category
router.get('/cat/:ctgry',checkAuth,(req,res,next)=>{
  Product.find({ctgry:req.params.ctgry})
  .then(result=>{
    res.status(200).json({
      product:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })
})
// save product
router.post('/',checkAuth,(req,res,next)=>{
  console.log(req);
  console.log(req.files);
  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
    console.log(result);
    myproduct = new Product({
      _id:new mongoose.Types.ObjectId,
      title:req.body.title,
      ctgry:req.body.ctgry,
      price:req.body.price,
      description:req.body.description,
      productCode:req.body.productCode,
      photo:result.url
    });
    myproduct.save()
    .then(result=>{
      console.log(result);
      res.status(200).json({
        new_product:result
      })
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      })
    })
  });

})

// update
router.put('/:id',checkAuth,(req,res,next)=>{
  console.log(req.params.id);
  const file = req.files.photo;
  console.log(file);
  cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
    console.log(result);
    Product.findOneAndUpdate({_id:req.params.id},{
      $set:{
        title:req.body.title,
        ctgry:req.body.ctgry,
        price:req.body.price,
        description:req.body.description,
        productCode:req.body.productCode,
        photo:result.url
      }
    })
    .then(result=>{
      res.status(200).json({
        updated_product:result
      })
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        error:err
      })
    })
  })

})

// get last 6 project 
router.get('/data/recent',checkAuth,(req,res,next)=>{
  Product.find().sort({$natural: -1 }).limit(6)
  .then(result=>{
    res.status(200).json({
      product:result
    })
  })
})


router.delete('/:productId',checkAuth,(req,res,next)=>{

  Product.remove({_id:req.params.productId})
  .then(result=>{
    res.status(200).json({
      message:'product has been deleted',
      result:result
    })
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  })

})


module.exports = router;
