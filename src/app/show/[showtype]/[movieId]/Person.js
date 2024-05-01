import Image from 'next/image'
import noImage from '../../../images/no-image-icon.jpg'
import { useRouter } from 'next/navigation'
import ReadMoreReact from 'read-more-react';


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
             <div className='detail_title' >{data.name}</div>
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
                    <div key={i.id}>
                    <div className='person_image_card' onClick={()=>(route.push('/show/movie/'+i.id))}>
                        <Image fill src={i.poster_path? 'http://image.tmdb.org/t/p/w500/'+i.poster_path:noImage} />
                       
                    </div>
                    <div style={{textAlign:'center',fontWeight:'600'}}>{i.title}</div>
                    </div>
                ))
            }
        </div>
        </div>
    )
}