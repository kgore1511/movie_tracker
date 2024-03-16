"use client"
import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
const AppContext = React.createContext()


const AppProvider = ({children}) => {
    const [movies,setMovies] = useState([])
    const [movieIsLoading,setMovieIsLoading] = useState(false)
    const [movieDetails,setMovieDetails] =useState({})

const getMovieById=(id)=> {
  axios.get('http://www.omdbapi.com/?apikey=d9c657&i='+id).then(res =>{
    setMovieDetails(res.data)
  }).catch(err => {
    console.log(err)
  })

}

    const getMovies =()=> {
       // const arr='tt6495056,tt13287846,tt10676048,tt22698070,tt28786861,tt14362112,tt11858890,tt9362930,tt9224104,tt8589698,tt27687527,tt4495098,tt1517268,tt9603212,tt27155038,tt0439572,tt1462764,tt15789038,tt27469256,tt5090568,tt5971474,tt9362722,tt26341934,tt5433140,tt5264838'

        axios.request({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/discover/movie?api_key=d99711958afc6813e6ed0081773c8989&certification_country=India&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=12&with_original_language=hi',
            }).then(response => {
              setMovies(response.data.results)
            })
              .catch(err=> {
              console.log(err)
            })
    }

    return <AppContext.Provider value={{movies,movieIsLoading,movieDetails,getMovies,getMovieById}}>{children}</AppContext.Provider>
}

const useGlobalContext=()=> {
    return useContext(AppContext)
}

export {AppContext,AppProvider,useGlobalContext}