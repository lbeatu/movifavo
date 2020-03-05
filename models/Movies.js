const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
   
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    Title:{
        type:String,        
    },
    imdbID:{
        type:String
    },
    Year:{
        type:String,            
    },
    Writer:{
        type:String,
    },
    Production:{
        type:String,
    },    
    Awards:{
        type:String,
    },    
    BoxOffice:{
        type:String,
    },    
    Country:{
        type:String,
    },
    DVD:{
        type:String,
    },
    Director:{
        type:String,
    },
    Genre:{
        type:String,
    },
    Plot:{
        type:String,
    },
    Poster:{
        type:String,
    },
    Language:{
        type:String,
    },
    Runtime:{
        type:String,
    },
    imdbRating:{
        type:String,
    },
    imdbID:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
   },
});

module.exports = mongoose.model('movie',MovieSchema);