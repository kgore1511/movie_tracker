"use client"
import React, { useEffect } from 'react'
import { useGlobalContext } from '../context'
import './styles.css'
function page({params}) {
  
const {getMovieById}= useGlobalContext()
const movieDetails={
  "Title": "Migration",
  "Year": "2023",
  "Rated": "PG",
  "Released": "22 Dec 2023",
  "Runtime": "83 min",
  "Genre": "Animation, Adventure, Comedy",
  "Director": "Benjamin Renner, Guylo Homsy",
  "Writer": "Mike White, Benjamin Renner",
  "Actors": "Kumail Nanjiani, Tresi Gazal, Elizabeth Banks",
  "Plot": "A family of ducks try to convince their overprotective father to go on the vacation of a lifetime.",
  "Language": "English",
  "Country": "United States, France, Canada",
  "Awards": "1 win & 6 nominations",
  "Poster": "https://m.media-amazon.com/images/M/MV5BYTIxZDM5YWItM2Y1My00ODg5LTkzNjAtMWFlZTNlODg0MzEyXkEyXkFqcGdeQXVyMTA5ODEyNTc5._V1_SX300.jpg",
  "Ratings": [
      {
          "Source": "Internet Movie Database",
          "Value": "6.7/10"
      },
      {
          "Source": "Rotten Tomatoes",
          "Value": "72%"
      }
  ],
  "Metascore": "N/A",
  "imdbRating": "6.7",
  "imdbVotes": "17,523",
  "imdbID": "tt6495056",
  "Type": "movie",
  "DVD": "23 Jan 2024",
  "BoxOffice": "$120,434,770",
  "Production": "N/A",
  "Website": "N/A",
  "Response": "True"
}
useEffect(()=> {
 // getMovieById(params.movieId)
},[])
  return (
    <div className='container'>
      <div className='card'><img className='image' src={movieDetails.Poster} />
      </div>
      <div className='details'>
      <div className='title'>{movieDetails.Title} <h2>{movieDetails.Year}</h2></div>
      {
        movieDetails.Country.split(',').map((genre)=><span className='genre'>{genre}</span>)
      }
      <div>{movieDetails.Released}</div>
      <div>{movieDetails.Plot}</div>
      <div></div>
      </div>
    </div>
  )
}

export default page