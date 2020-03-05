import React from 'react'
import { Link } from 'react-router-dom'

const MovieItem = ({movies: {Title,Poster,Year,Type,imdbID}}) => {
  // console.log(Title);
   
    return (       
        <div className="card card-1 text-center"> 
            <Link to={`/movie/${imdbID}`} >     
            <img src={Poster}
                    alt="" 
                    className="round-img"
                /> 
            </Link>                         
            <h4 className="text-bar" >
                {Title}
            </h4>
            <div className="card1">
            <h4 className="text-content" >
            {Year},{Type}</h4>              
            </div>        
         </div>                                    
    )
}

export default MovieItem
