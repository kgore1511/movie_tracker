import React from 'react'
import { Skeleton } from '@mui/material'
import { redirect ,useRouter} from 'next/navigation'
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import {
  SelectedSnapDisplay,
  useSelectedSnapDisplay
} from './EmblaCarouselSelectedSnapDisplay'
import useEmblaCarousel from 'embla-carousel-react'

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const {push}=useRouter()
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)
  return (
    <div>
      <div className='card_header'>
        <div className='header_item'>Drama</div>
      <div className="embla__controls header_item">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
      </div>
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
        {slides.length>0 && slides.map((item,index)=> (
          <div className="embla__slide" key={index}>
          <div className="embla__slide__number" onClick={()=>push('/ui/'+item.id)}>
            {item?.poster_path?<img id='img' alt='Loading...' className='carousel_image' src={'http://image.tmdb.org/t/p/w500'+item?.poster_path} />:
            <Skeleton variant="rounded" width='18rem' height='20rem' ><p className='title'>{item.titleText?.text}</p></Skeleton>
            }</div>
        </div>
           )
          )}
          {/*slides.map((item,index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">{item.name}</div>
            </div>
          ))*/}
        </div>
      </div>

      
    </section></div>
  )
}

export default EmblaCarousel
