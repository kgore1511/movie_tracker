"use client"
import React, { useContext, useEffect ,useState} from 'react'
import './css/base.css'
import './css/embla.css'
import  filterHeader from '../app/filterHeader';
import PrimarySearchAppBar from './PrimarySearchAppBar';
import EmblaCarousel from "./EmblaCarousel";
import { useGlobalContext } from './context'; 
import { Backdrop,CircularProgress } from '@mui/material';
import EmblaCarouselMain from './mainCarousel/EmblaCarouselMain';
function page() {
  const [open,setOpen] = useState(false)
  const OPTIONS = { dragFree: true }
const {movies,movieIsLoading,genres,popularMovies,nowPlaying,nowPlayingIsLoading,getPopularMovies,getGenres,getNowPlaying,getMovies}= useGlobalContext()

  useEffect(()=> {
    getGenres()
    getNowPlaying()
    getPopularMovies()
 },[])
useEffect(()=> {
  for(let x=0;x<genres.length;x++) getMovies(genres[x])
},[genres])


const handleClose = () => {
  setOpen(false);
};
const handleOpen = () => {
  setOpen(true);
};

  return (
    <>
  
    {movieIsLoading ? <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={movieIsLoading}
><CircularProgress color="inherit" /></Backdrop>:
<>
    <div className='container' >
    <EmblaCarouselMain slides={nowPlaying}  />
    </div>
    {Object.keys(movies).map(key => (
      
    <div key={key}> <EmblaCarousel slides={movies} Key={key} options={OPTIONS} /></div> 
    )
  )}</>
  }
    
        
        </>
  )
}

export default page
