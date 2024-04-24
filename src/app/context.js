"use client"
import axios from "axios";
import React, {useContext, useEffect, useState} from "react";

const AppContext = React.createContext()

const AppProvider = ({children}) => {
    const [movies,setMovies] = useState({})
    const [movieIsLoading,setMovieIsLoading] = useState(false)
    const [trendingMovies,setTrendingMovies] = useState([])
    const [trendingMoviesIsLoading,setTrendingMoviesIsLoading] = useState(false)
    const [genres,setGenres] = useState([])
    const [genresIsLoading,setGenresIsLoading] = useState(false)
    const [popularMovies,setPopularMovies] = useState([])
    const [popularMovieIsLoading,setPopularMoviesIsLoading] = useState(false)
    const [detailIsLoading,setDetailIsLoading] = useState(false)
    const [detail,setDetail] =useState({})
    const [watchProvider,setWatchProvider] = useState({})
    const [watchProviderLoading,setWatchProviderLoading] = useState(false)
    const [nowPlaying,setNowPlaying] = useState([])
    const [nowPlayingIsLoading,setNowPlayingIsLoading] = useState([])
    const [searchResultsIsLoading,setSearchResultsIsLoading] = useState(false)
    const [searchResults,setSearchResults] = useState([])
    const base_url=process.env.NEXT_PUBLIC_BASE_URL
    const api_key=process.env.NEXT_PUBLIC_API_KEY
    
    
    const getTrendingMovies=(type)=> {
      setTrendingMoviesIsLoading(true)
      axios.get(base_url+'/3/trending/'+type+'/day?language=en-US&api_key='+api_key).then(res=> {
        setTrendingMovies(res.data)
        setTrendingMoviesIsLoading(false)
      }).catch(err =>{
        console.log(err)
      })
    } 
    
    const getPopularMovies=()=> {
      setPopularMoviesIsLoading(true)
      axios.get(base_url+'/3/movie/upcoming?api_key='+api_key+'&language=hi-IN&page=1&region=IN').then(res=> {
        setPopularMovies(res.data)
        setPopularMoviesIsLoading(false)
      }).catch(err =>{
        console.log(err)
      })
    }

    const getGenres=()=> {
      setGenresIsLoading(true)
      axios.get(base_url+'/3/genre/movie/list?api_key='+api_key).then(res=> {
        setGenres(res.data.genres)
        setGenresIsLoading(false)
      }).catch(err =>{
        console.log(err)
      })
    }

const getDetailById=(showtype,id)=> {
  setDetailIsLoading(true)
  axios.get(base_url+'/3/'+showtype+'/'+id+'?&append_to_response=videos,credits,recommendations,reviews,similiar&api_key='+api_key).then(res =>{
    setDetail(res.data)
    setDetailIsLoading(false)
  }).catch(err => {
    console.log(err)
  })

}

    const getMovies =(genre)=> {
      setMovieIsLoading(true)
        axios.request({
            method: 'GET',
            url: base_url+'/3/discover/movie?api_key='+api_key+'&certification_country=India&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres='+genre.id+'&with_original_language=hi',
            }).then(response => {
              let name=genre.name, movie=response.data.results
              setMovies(prev=>({...prev,[name]:movie}))
              setMovieIsLoading(false)
            })
              .catch(err=> {
              console.log(err)
            })
    }

    const getNowPlaying=()=> {
      setNowPlayingIsLoading(true)
      axios.request({
        method: 'GET',
        url: base_url+'/3/movie/now_playing?language=en-US&region=IN&page=1&api_key='+api_key
      }).then(response => {
        setNowPlayingIsLoading(false)
        setNowPlaying(response.data.results)
      }).catch(err=> {
        console.log(err)
      })
    }

    const getSearchResult=(type,keyword)=> {
      setSearchResultsIsLoading(true)
      axios.request({
        method: 'GET',
        url: base_url+'/3/search/'+type+'?api_key='+api_key+'&include_adult=false&query='+keyword+'&language=en-US&page=1'
      }).then(response => {
        setSearchResults(response.data.results)
        setSearchResultsIsLoading(false)
      }).catch(err => {
        console.log(err)
      })
    }

  const getWatchProvider=(showtype,id)=> {
    setWatchProviderLoading(true)
    axios.request({
      method: 'GET',
      url: base_url+'/3/'+showtype+'/'+id+'/watch/providers?api_key='+api_key
    }).then(response => {
      setWatchProviderLoading(false)
      setWatchProvider(response.data.results)
    }).catch(err=> {
      console.log(err)
    })
  }

    return <AppContext.Provider value={{
      popularMovies,
      genres,
      genresIsLoading,
      popularMovieIsLoading,
      movies,
      movieIsLoading,
      detail,
      detailIsLoading,
      watchProvider,
      watchProviderLoading,
      nowPlayingIsLoading,
      nowPlaying,
      searchResults,
      searchResultsIsLoading,
      trendingMovies,
      trendingMoviesIsLoading,
      getNowPlaying,
      getTrendingMovies,
      getPopularMovies,
      getMovies,
      getDetailById,
      getWatchProvider,
      getGenres,
      getNowPlaying,
      getSearchResult
    }}>{children}</AppContext.Provider>
}

const useGlobalContext=()=> {
    return useContext(AppContext)
}

export {AppContext,AppProvider,useGlobalContext}