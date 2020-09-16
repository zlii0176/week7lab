// post /actors => insert a new actors &&
//get /actors =>get all actors &&
//post /actors/movies/:aId (body raw json movie id ){"_id":21786481usjkcfbsja} => add movies to a actor
//delete /actors/:id =>delete a actors and all its movies 
//put /actors/:aId/:mId =>remove movie from actor

let mongoose = require("mongoose");
let Actor = require("../models/actor");

module.exports={

    insertActor:function(req,res){ //by body 
        let actor = new Actor({
            _id:new mongoose.Types.ObjectId(),
            name:req.body.name,
            bYear:req.body.bYear
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









}