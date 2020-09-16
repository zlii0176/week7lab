// post /actors => insert a new actors
//get /actors =>get all actors
//post /actors/movies/:aId (body raw json movie id ){"_id":21786481usjkcfbsja} => add movies to a actor
//delete /actors/:id =>delete a actors and all its movies 
//put /actors/:aId/:mId =>remove movie from actor

//post /movies =>insert a movie
//get /movies => get all movies
//get /movies/:year1/:year2 =>get movies between year1 and year2
//delete /movies/:id => delete a movie by id
//put /movies/:mId/:aId => remove a actor from a movie or put?
//post /movies/actors/mId => ("id"=sqfas) aId add actors to moviex
//delete /movies/year1/year2 => delete all movie between year1 and year 2

//actors:_id,name,bYear,movies[],
//movies: _id, title, tear, actors[],

let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let express = require('express');

let actorRouter=require('./routers/actorrouter');
let movieRouter = require('./routers/movierouter');



let app = express();
app.listen(8080);
app.use(bodyParser.json());

const DB_URL = "mongodb://localhost:27017/week7labdb"

mongoose.connect(DB_URL,function(err){
    if(err){
        console.log("Error Connecting to DB");
    }
    else{
        console.log("Connected Done");
    }
});

//actor's endpoints
app.post('/actors',actorRouter.insertActor);
app.get("/actors",actorRouter.getAllActors);
app.delete("/actors/:id",actorRouter.deleteActor);
app.put("/actors/movies/:aId",actorRouter.addMovie);
app.put("/actors/:aId/:mId",actorRouter.removeMovie);

//movie's endpoints
app.post('/movies',movieRouter.insertMovie);
app.get('/movies',movieRouter.getAllMovies);
app.delete("/movies/:id",movieRouter.deleteMovie);
app.put("/movies/actors/:mId",movieRouter.addActor);
app.put("/movies/:mId/:aId",movieRouter.removeActor);