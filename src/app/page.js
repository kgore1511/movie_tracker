"use client"
import React, { useContext, useEffect } from 'react'
import Image from 'next/image';
import './styles.css'
import { useState, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import { Card } from '@mui/material';
import "slick-carousel/slick/slick-theme.css";
import logo from './1.jpg'
import logo1 from './bridge.jpg'
import axios from 'axios'
import './css/base.css'
import './css/embla.css'
import EmblaCarousel from "./EmblaCarousel";
import { useGlobalContext } from './context'; 
function page() {
  const [genres,setGenres] = useState([])
  const [data,setData] = useState([])
  const OPTIONS = { dragFree: true }

    
const {movies,getMovies}= useGlobalContext()
  useEffect(()=> {
    getMovies()
 },[])
 
  var mainCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    swipeToSlide: true,
  };

  return (
    <>

    <div className='container' >
     <center> <Slider arrows={false} classname='carousel' {...mainCarouselSettings}>  
     <Card  variant="outlined">
     <div><Image  className='image' src={logo} /></div>  
          </Card>
          <Card  variant="outlined">
          <Image  className='image' src={logo1} />
        </Card>
      </Slider></center>
    </div>
    
    <div> <EmblaCarousel slides={movies} options={OPTIONS} /></div>     
        
        </>
  )
}

export default page
