const express = require('express');
const router =express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');


const Movie =require('../models/Movies');
const User =require('../models/User');


// @route    GET api/movies
// @desc      Get all users movies.
// @access    Private
router.get('/',auth, async (req,res)=>{
    try {
      
        const movies = await Movie.find({user: req.user.id}).sort({date:-1});
        res.json(movies);
     } catch (err) {
        res.status(500).send('Server Error..');
     }


});

// @route    POST api/movies
// @desc      Get all users movies.
// @access    Private
router.post('/',auth,
    async(req,res)=>{
       const errors = validationResult(req);
       if(!errors.isEmpty()){    
           return res.status(400).json({ errors:errors.array() });
    
        
        }

       const {
        Actors,
        Awards,
        BoxOffice,
        Country,
        DVD,
        Director,
        Genre,
        Language,
        Plot,
        Poster,
        Production,
        Title,
        Writer,
        Year,
        imdbRating,
        Runtime,
        imdbID,        
         }   =req.body;
         console.log(req.body);
         
       try {
           const newMovie = new Movie({
            Actors,
            Awards,
            BoxOffice,
            Country,
            DVD,
            Director,
            Genre,
            Language,
            Plot,
            Poster,
            Production,
            Title,
            Writer,
            Year,
            imdbRating,
            Runtime,
            imdbID,
            user:req.user.id
           });

           const movie = await newMovie.save();
           console.log(movie);
           
           res.json(movie);
       } catch (err) {
           console.log(err.message);
           res.status(500).send('Server Error..');
       }
       
});

router.put('/:id',auth, async (req,res)=>{
    const {
        Actors,
        Awards,
        BoxOffice,
        Country,
        DVD,
        Director,
        Genre,
        Language,
        Plot,
        Poster,
        Production,
        Title,
        Writer,
        Year,
        imdbRating,
        Runtime,
        imdbID,        
         }   =req.body;
         console.log(req.body);

    //Build contact object
    const movieFields ={};
    if(Actors) movieFields.Actors = Actors;
    if(Awards) movieFields.email = Awards;
    if(BoxOffice) movieFields.BoxOffice = BoxOffice;
    if(Country) movieFields.Country = Country;
    if(DVD) movieFields.DVD = DVD;
    if(Director) movieFields.Director = Director;
    if(Genre) movieFields.Genre = Genre;
    if(Plot) movieFields.Plot = Plot;
    if(Poster) movieFields.Poster = Poster;
    if(Production) movieFields.Production = Production;
    if(Title) movieFields.Title = Title;
    if(Writer) movieFields.Writer = Writer;
    if(Year) movieFields.Year = Year;
    if(imdbRating) movieFields.imdbRating = imdbRating;
    if(Runtime) movieFields.Runtime = Runtime; 
    if(imdbID) movieFields.imdbID = imdbID;
    if(Language) movieFields.Language = Language;
    
    try {
        let movie = await Movie.findById(req.params.id);

        if(!movie) return res.status(404).json({msg: 'Movie not found'})

        //Make sure user owns contact
        if(movie.user.toString() !==req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        movie = await Movie.findByIdAndUpdate(req.params.id, 
            { $set:movieFields },
            { new: true });

            res.json(movie);
    } catch (err) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }

});

// @route     DELETE  api/contacts/:id
// @desc      Delete contact
// @access    Private
router.delete('/:id',auth, async(req,res)=>{
    try {
        let movie = await Movie.findById(req.params.id);

        if(!movie) return res.status(404).json({msg: 'Contact not found'})

        //Make sure user owns contact
        if(movie.user.toString() !==req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        await Movie.findOneAndRemove(req.params.id)
            res.json({msg: 'Contact removed'});
    } catch (err) {
        console.log(error.message);
        res.status(500).send('Server Error.');
    }
});
module.exports=router;