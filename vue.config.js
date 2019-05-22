const express = require("express");

var app = express()

// 拿到json 数据

var sellData = require("./data.json")

var seller = sellData.seller;
var goods = sellData.goods;
var ratings = sellData.ratings;


module.exports = {
    devServer:{
        host:"localhost",
        port:"8088",
        before(app){
            app.get("/api/seller",(req,res)=>{
                res.json({
                    errno:0,
                    seller:seller
                })
            })
            app.get("/api/goods",(req,res)=>{
                res.json({
                    errno:0,
                    goods:goods
                })
            })
            app.get("/api/ratings",(req,res)=>{
                res.json({
                    errno:0,
                    ratings:ratings
                })
            })
        }
    }
}