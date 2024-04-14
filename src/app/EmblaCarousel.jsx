import React from 'react'
import { Skeleton } from '@mui/material'
import { redirect ,useRouter} from 'next/navigation'
import noImage from './[showtype]/[movieId]/no-image-icon.jpg'
import Image from 'next/image'
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
  const { slides, Key, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const {push}=useRouter()
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)
  console.log(Key)
  return (
    <div>
         
   
      <div className='card_header'>
    <div className='header_item'>{Key}</div>
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
    {slides[Key]?.length>0 && slides[Key].map((item,index)=> (
      
      <div className="embla__slide" key={index}>
        
      <div className="embla__slide__number" onClick={()=>push('/movie/'+item.id)}>
        {item?.poster_path?<Image width={200} height={150} id='img' alt='Loading...' className='carousel_image' src={item?.poster_path? 'http://image.tmdb.org/t/p/w500'+item?.poster_path:noImage} />:
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

  
</section>

</div>
  )
}

export default EmblaCarousel
