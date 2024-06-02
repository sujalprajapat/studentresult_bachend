const { name } = require('ejs');
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    rollno:{
        type:String,
    },
    sub1:{
        type:Number,
    },
    sub2:{
        type:Number,
    },
    sub3:{
        type:Number,
    },
    sub4:{
        type:Number,
    },
    sub5:{
        type:Number,
    },
    total:{
        type:Number,
    },
    per:{
        type:Number,
    },
    max:{
        type:Number,
    },
    min:{
        type:Number,
    },
    result:{
        type:String
    },
    stu_id:{
        type:mongoose.Schema.Types.String,
        ref:"student"
    }
})
module.exports = mongoose.model('result',schema)