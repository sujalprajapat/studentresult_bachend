var mongoose =require("mongoose");
var schema =new mongoose.Schema({
    s_name:{
        type:String
    },
    s_email:{
        type:String
    },
    password:{
        type:String  
    }
});
module.exports = mongoose.model('staff',schema);