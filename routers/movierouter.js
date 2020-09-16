//post /movies =>insert a movie &&
//get /movies => get all movies &&
//get /movies/:year1/:year2 =>get movies between year1 and year2
//delete /movies/:id => delete a movie by id
//put /movies/:mId/:aId => remove a actor from a movie or put?
//post /movies/actors/mId => ("id"=sqfas) aId add actors to moviex
//delete /movies/year1/year2 => delete all movie between year1 and year 2

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








}
