let mongoose = require('mongoose');
let actorSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name:String,
    bYear:Number,
    movie:[{
        type:mongoose.Types.ObjectId,
        ref:"Movie"
    }]
});

module.exports=mongoose.model("Actor",actorSchema);