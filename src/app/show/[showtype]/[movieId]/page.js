"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGlobalContext } from '../../../context'
import YouTube from 'react-youtube'
import { Rating } from '@mui/material'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Image from 'next/image'
import noImage from '../../../images/no-image-icon.jpg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Skeleton,Backdrop,CircularProgress} from '@mui/material'
import Person from './Person'
import './styles.css'
function page({params}) {
  const route= useRouter()
const {getDetailById,detail,detailIsLoading,getWatchProvider,watchProvider,watchProviderLoading}= useGlobalContext()

useEffect(()=> {
  getDetailById(params.showtype,params.movieId)
  if(params.showtype!='person') getWatchProvider(params.showtype,params.movieId)
},[])

const opts = {
    height: '300',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 1,
      showinfo: 0,
      mute: 1,
      loop: 1
    },
  };


  return (
    <div className='container_detail'>
      
      { detailIsLoading ? <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={detailIsLoading}
><CircularProgress color="inherit" /></Backdrop>:
        <div className='content'>
       { params.showtype=='movie' ?<div>  
          
      <div className='card'>
        { detail?.videos?.results.length>0? 
        <div className='youtube_player'><YouTube videoId={detail.videos?.results[0]?.key} opts={opts}  /></div>:
        <div className='image_card'><Image fill src={'http://image.tmdb.org/t/p/w500'+detail.backdrop_path} /></div>
      }
      </div>
      <div className='details'>
      <div className='detail_title'>{detail.title} <span>{detail.release_date} </span></div>
      <div>
      {
        detail?.genres?.map((genre)=><span key={genre.id} className='genre'>{genre.name}</span>)
      }
      </div>
      <div><Rating name="half-rating-read" value={detail.vote_average} readOnly precision={0.2} defaultValue={2} max={10} /></div>
      Available on <div>
      <div className='stream_panel'>
        Stream 
        {
          
        watchProviderLoading ? <div>Loading...</div>:
       
        watchProvider?.IN?.flatrate?.map((i)=> (
          
             <img key={i.logo_path} className='stream_logo' src={'http://image.tmdb.org/t/p/w500'+i.logo_path}/>
          
        ))
        }
        </div>
        <div className='stream_panel'>
          <div>Rent </div>
        {
        watchProvider?.IN?.rent?.map((i)=> (
          
             <img key={i.logo_path} className='stream_logo' src={'http://image.tmdb.org/t/p/w500'+i.logo_path}/>
          
        ))
        }
        </div>
        <div className='stream_panel'>
          Buy
        {
        watchProvider?.IN?.buy?.map((i)=> (
          <span>
             <img className='stream_logo' src={'http://image.tmdb.org/t/p/w500'+i.logo_path}/>
          </span>
        ))
        }
        </div>
        </div>
      <div>{detail.overview}</div>
       <div className='cast'>
      <Accordion sx={{width:'100%'}}>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
        <Typography>Cast</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography className='cast_detail'>
      {
      detail?.credits?.cast.map(i=> (
          <div key={i.id} className='celebrity_image_card' onClick={()=>(route.push('/show/person/'+i.id))}>
            <div  className="cast_image">
          <Image  width={0}
  height={0}
  sizes="100vw"
   src={i.profile_path? 'http://image.tmdb.org/t/p/w500'+i.profile_path:noImage } loading='lazy' alt={i.name} />
          </div><div className='cast_name'>{i.name}</div></div>    
      ))
      }
       </Typography>
       </AccordionDetails>
      </Accordion>
      </div>

      <div>
      <Accordion sx={{width:'100%'}}>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
      <Typography>Related Shows</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <Typography className='cast_detail'>
      {
      detail?.recommendations?.results?.map(i=> (
          <div key={i.id} className='related_image_card' onClick={()=>(route.push('/show/movie/'+i.id))}>
            <div className='related_image'>
          <Image  fill  src={'http://image.tmdb.org/t/p/w500'+i.poster_path} alt='loading'/></div>
          <div className='cast_name'>{i.title}</div></div>    
      ))
      }
       </Typography>
       </AccordionDetails>
      </Accordion>
      </div>
      <div>Reviews</div>
      <div>
        
        {
          detail?.reviews?.results?.map((i)=> (
            <div key={i.id} >
              <div className='user_icon'><AccountCircleIcon />{i.author}</div>
              <div><Rating name="half-rating-read" value={i.author_details.rating} readOnly precision={0.2} defaultValue={2} max={10} /></div>
              <div>{i.content}</div>

            </div>
          ))
        }
      </div>
      </div></div>:<Person data={detail}/> }
      </div>
}
    </div>
  )
}

export default page