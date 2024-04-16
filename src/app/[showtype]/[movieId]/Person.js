import Image from 'next/image'
import noImage from './no-image-icon.jpg'
import { useRouter } from 'next/navigation'
import ReadMoreReact from 'read-more-react';

const value="HA! Old thread but thanks for that! I guess I'm one of those old  that tries to support at least back to IE8 when possible, for the benefit of the surprising number of older home users who will never stop using XP until their machines catch fire. I get tired of asking questions and instead of getting an answer, getting down-voted with only as a comment. Again thanks! This solved a problem for me in a pure javascript photo zoom I had done. Its a little slow on IE8, but now at least it works"

export default function Person({data}) {
    const route=useRouter()
    return (
        <div className='person'>
        <div className='person_container'>
            <div className='person_image'>
            <Image fill style={{borderRadius:'50%'}} src={'http://image.tmdb.org/t/p/w500/'+data.profile_path}/>
            </div>
        { data &&
        <div className='person_detail'>
             <div className='detail_title'>{data.name}</div>
             <div>{data.birthday}</div>
             <div><div className='genre'>{data.known_for_department}</div></div>
             <div>{data.place_of_birth}</div>
            
             <div>{data.biography &&<ReadMoreReact text={data.biography} 
                
                readMoreText="view more"/>}</div>
        </div>
}
        </div>
        <div className='person_shows'>
            {
                data?.credits?.cast.map(i=> (
                    <div className='person_image_card' onClick={()=>(route.push('/movie/'+i.id))}>
                        <Image fill src={i.poster_path? 'http://image.tmdb.org/t/p/w500/'+i.poster_path:noImage} />
                    </div>
                ))
            }
        </div>
        </div>
    )
}