//post /movies =>insert a movie &&
//get /movies => get all movies &&
//get /movies/:year1/:year2 =>get movies between year1 and year2 &&
//delete /movies/:id => delete a movie by id &&
//put /movies/:mId/:aId => remove a actor from a movie or put? $$
//post /movies/actors/mId => ("id"=sqfas) aId add actors to moviex &&
//delete /movies/year1/year2 => delete all movie between year1 and year 2 &&

//2,6,9,10

let mongoose = require("mongoose");
let Movie = require("../models/movie");

module.exports={

    insertMovie:function(req,res){ //by body 
        let movie = new Movie({
            _id:new mongoose.Types.ObjectId(),
            title:req.body.title,
            year:req.body.year
        });

        movie.save(function(err,data){
            if(err) res.json(err);
            else res.json(data);
        });
    },

    getAllMovies:function(req,res){
        Movie.find({}).populate("actors").exec(function(err,data){
            res.json(data);
        });
    },

    deleteMovie:function(req,res){
        Movie.findByIdAndDelete({
            _id:req.params.id
        },function(err,data){
            if(!err) res.json(data);
            else res.json(err);
        });
    },

    addActor:function(req,res){
        Movie.findByIdAndUpdate({
            _id:req.params.mId
        },{
            $push:{
                "actors":mongoose.Types.ObjectId(req.body.actors)
            }
        },{
            upsert:false
        },function(err,data){
            if(!err) res.json(data);
        });
    },
    removeActor:function(req,res){
        Movie.findByIdAndUpdate({
            _id:req.params.mId
        },{
            $pull:{
                "actors":mongoose.Types.ObjectId(req.params.aId)
            }
        },{
            upsert:false
        },function(err,data){
            if(!err) res.json(data);
        });
    },
    getMovieByYear:function(req,res){
        Movie.find({}).where("year").gte(req.params.year1).lte(req.params.year2).exec(function(err,data){
            if (!err) res.json(data);
        })
    }, 
    deleteMovieByYear:function(req,res){
        Movie.deleteMany({}).where("year").gte(req.params.year1).lte(req.params.year2).exec(function(err,data){
            if (!err) res.json(data);
        })
    }








}
