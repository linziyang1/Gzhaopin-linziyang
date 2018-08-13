const md5 = require("blueimp-md5");
const express = require("express")
const router = express.Router();

// 引入数据模块 UserModel

const {UserModel} = require("../db/models");
const filtr = {password:0}//查询过滤出指定的属性

//注册
router.post("/register",function (req,res) {
  // 获取请求参数
  const {username,password,type} = req.body
  //处理数据，返回响应
  // 根据 username 查询数据库，看是否有已存在的name
  UserModel.findOne({username},(err,user)=> {
    if(user){
      res.send({code:1,msg:"用户已存在"})
    }else {


      new UserModel({username,password:md5(password),type}).save(function (err,user) {
        res.cookie("userid",user._id,{maxAge:1000*60*60*24*7})
        res.json({code:0,data:{_id:user._id,username,type}})
      })
    }
  })
})

// 登录
router.post("/login",function (req,res) {
  //获取请求参数
  const {username,password} = req.body
  // 处理数据，根据username，password去数据库查询到user
  UserModel.findOne({username,password:md5(password)},filtr,function (err,user) {
    // 返回响应
  if(!user){
    res.send({code:1,msg:"用户名或密码错误"})
  }else{
    res.cookie("userid",user._id,{maxAge:1000*60*60*24*7})
    res.send({code:0,data:user})
  }
  })
})

router.post("/asd",function(req,res) {
  const {username,password} = req.body
  res.send(username,password)
})
module.exports = router