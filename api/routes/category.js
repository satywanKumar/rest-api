const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Category = require('../model/category');

router.get('/',(req,res,next)=>{
    Category.find()
    .select(' _id name')
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

router.post('/',(req,res,next)=>{
    category = new Category({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name
    });
    category.save()
    .then(result=>{
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