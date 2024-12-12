import React from 'react'
import './emblamain.css'
import Autoplay from 'embla-carousel-autoplay'
import { DotButton, useDotButton } from './EmblaCarouselDotButtonMain'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtonMain'
import { useRouter } from 'next/navigation'
import useEmblaCarousel from 'embla-carousel-react'

const isavailable=(value)=> {
  if(value.backdrop_path) return true
  return false
}

const EmblaCarouselMain = (props) => {
  const route = useRouter()
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options,[
    Autoplay()
  ])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  return (
    <section className="embla_main">
      <div className="embla__viewport_main" ref={emblaRef}>
        <div className="embla__container_main">
        
        {slides?.length>0 &&  slides.filter(isavailable).map((item,index)=> (
          <div className="embla__slide_main" key={index}>  
            <div className='banner'>
              <div className='banner_header'>
                <div className='banner_title'>{item.title}</div>
                <div className='banner_description'>{item.overview}</div>
                <button className="button onhover" >Watch Now</button>
                </div>
              
            </div>
          <div className="embla__slide__number_main" onClick={()=>route.push('/show/'+item.id)}>
            {item?.poster_path?<img id='img' className='main_image' alt='Loading...'  src={'http://image.tmdb.org/t/p/w500'+item?.backdrop_path} />:
           <p className='title'>{item.titleText?.text}</p>
            }</div>
        </div>
           )
          )}
        </div>
      </div>
    </section>
  )
}

export default EmblaCarouselMain
