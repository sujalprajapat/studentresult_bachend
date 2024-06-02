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
    },
    std:{
        type:String
    },
    div:{
        type:String
    },
    result_id:{
        type: mongoose.Schema.Types.String,
        ref: "result"
    }
});
module.exports = mongoose.model('student',schema);