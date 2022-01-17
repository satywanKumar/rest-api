const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../model/category');
const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name:'dqpfadgjp',
    api_key:'482984841652561',
    api_secret:'Z4Uv3LtWKbd0U78TgLG6LRhCtWU'
  });



router.get('/',(req,res,next)=>{
    Category.find()
    .select(' _id name photo')
    .then(result=>{
       res.status(200).json({
           category:result
       }) 
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

// save category
router.post('/',(req,res,next)=>{
    console.log(req);
    console.log(req.files);
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
      console.log(result);
      category = new Category({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        photo:result.url
      });
      category.save()
      .then(result=>{
        console.log(result);
        res.status(200).json({
          new_category:result
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
  

router.delete('/:id',(req,res,next)=>{
    console.log(req.params.id);
    Category.findByIdAndRemove(req.params.id)
    .then(result=>{
        res.status(200).json({
            message:'category deleted',
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