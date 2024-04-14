import Image from 'next/image'
import noImage from './no-image-icon.jpg'
import { useRouter } from 'next/navigation'
export default function Person({data}) {
    const route=useRouter()
    return (
        <div className='person'>
        <div className='person_container'>
            <div className='person_image'>
            <Image fill src={'http://image.tmdb.org/t/p/w500/'+data.profile_path}/>
            </div>
        
        <div className='person_detail'>
             <div className='detail_title'>{data.name}</div>
             <div>{data.birthday}</div>
             <div className='genre'>{data.known_for_department}</div>
             <div>{data.place_of_birth}</div>
             <div>{data.biography}</div>
        </div>
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