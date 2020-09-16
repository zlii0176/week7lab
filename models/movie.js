let mongoose = require('mongoose');
let movieSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    title:String,
    year:Number,
    actors:[{
        type:mongoose.Types.ObjectId,
        ref:"Actor"
    }]
});

module.exports=mongoose.model("Movie",movieSchema);