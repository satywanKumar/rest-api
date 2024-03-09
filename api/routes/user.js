const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// user signup
router.post('/signup',(req,res,next)=>{
  console.log(req.body);
  bcrypt.hash(req.body.password,10,(err,hash)=>{
    if(err)
    {
      return res.status(500).json({
        error:err
      })
    }

    else
    {
        const user = new User({
        _id:new mongoose.Types.ObjectId,
        userName:req.body.userName,
        password:hash,
        email:req.body.email,
        phone:req.body.phone
      })

      user.save()
      .then(result=>{
        res.status(200).json({
          new_user : result
        })
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({
          error:err
        })
      })
    }
  })
})


// user login
router.post('/login',(req,res,next)=>{
  console.log(req.body);
  User.find({userName:req.body.userName})
  .exec()
  .then(user=>{
    console.log(user);
    if(user.length < 1)
    {
      return res.status(404).json({
        msg:'user not found'
      })
    }
    bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
      if(!result)
      {
        return res.status(401).json({
          msg:'password matching failed'
        })
      }
      if(result)
      {
        const token = jwt.sign({
          userName:user[0].username,
          email:user[0].email,
          phone:user[0].phone
        },
        'this is demo user api',
        {
          expiresIn:"24h"
        }
        );
        res.status(200).json({
          userName:user[0].userName,
          phone:user[0].phone,
          email:user[0].email,
          token:token
        })
      }
    })
  })

  .catch(err=>{
    res.status(500).json({
      error:err
    })
  })

})


module.exports = router;
