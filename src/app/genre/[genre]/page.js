"use client"
import { useEffect, useState } from "react"
import { useGlobalContext } from "../../context"
import { CircularProgress, Pagination, Stack } from "@mui/material"
import { useRouter } from "next/navigation"
import Image from "next/image"
import '../../show/[showtype]/[movieId]/styles.css'
import  Pagnation  from "../../component/Pagination"
export default function page({params}) {
    const [page,setPage] = useState(1)
    const route=useRouter()
    let str=params.genre
    const key=str[0].toUpperCase()+str.slice(1)
    const {movies,movieIsLoading,genres,getGenres,getMovies}= useGlobalContext()
    const [genreId,setgenreId] = useState(12)
    const checkEqual=(i)=> {
        if(i.name.toLowerCase()==params.genre) setgenreId(i.id)
    }
    
    useEffect(()=> {
        getGenres()
       
    },[])

    useEffect(()=> {
        for(let x=0;x<genres.length;x++) {
            if(genres[x].name.toLowerCase()==params.genre) getMovies(genres[x],page)
        }
    
    },[genres,page])
        

    return (<>
    <center> <h2 style={{fontSize:'40px',fontWeight:'600',color:'#fff'}}>{params.showtype}</h2></center>
        <div className='container_detail'>
           
        {movieIsLoading ? <CircularProgress color="inherit" />:
        <div className="content person_shows">
            
            {movies[key]?.results.map(i=> (
                <div key={i.id} className="trending_image_card" onClick={()=>route.push('/show/movie/'+i.id)}>
                    <div className="trending_image">
                    {i.media_type=='person' ?<Image fill style={{borderRadius:'5px'}} src={'http://image.tmdb.org/t/p/w500'+i.profile_path} />:
                    <Image fill  src={'http://image.tmdb.org/t/p/w500'+i.poster_path} /> }
                    </div>
                    <div className="popular_person_name">{i.name}</div>
                    </div>
            ))}
              
        </div>

        }
       
        </div>
        <Pagnation setPage={setPage} page={page} count={movies[key]?.total_pages} />
                </>
    )
}