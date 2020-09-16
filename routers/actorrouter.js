// post /actors => insert a new actors &&
//get /actors =>get all actors &&
//post /actors/movies/:aId (body raw json movie id ){"_id":21786481usjkcfbsja} => add movies to a actor &&
//delete /actors/:id =>delete a actors and all its movies &&*
//put /actors/:aId/:mId =>remove movie from actor &&

let mongoose = require("mongoose");
let Actor = require("../models/actor");
let Movie = require("../models/movie")


module.exports={

    insertActor:function(req,res){ //by body 
        let actor = new Actor({
            _id:new mongoose.Types.ObjectId(),
            name:req.body.name,
            bYear:req.body.bYear,
            movies:req.body.movies
        });

        actor.save(function(err,data){
            if(err) res.json(err);
            else res.json(data);
        });
    
    },

    getAllActors:function(req,res){
        Actor.find({}).populate("movies").exec(function(err,data){
            res.json(data);
        });
    },

    deleteActor:function(req,res){
        Actor.findByIdAndDelete({
            _id:req.params.id
        },function(err,data){
           if(!err) res.json(data);
        });
    },

   
    

    addMovie:function(req,res){
        Actor.findByIdAndUpdate({
            _id:req.params.aId
        },{
            $push:{
                "movies":mongoose.Types.ObjectId(req.body.movies)
            }
        },{
            upsert:false
        },function(err,data){
            if(!err) res.json(data);
        });
    },
    
    removeMovie:function(req,res){
        Actor.findByIdAndUpdate({
            _id:req.params.aId
        },{
            $pull:{
                "movies":mongoose.Types.ObjectId(req.params.mId)
            }
        },{
            upsert:false
        },function(err,data){
            if(!err) res.json(data);
        });
    }











}