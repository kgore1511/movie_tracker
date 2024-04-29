"use client"
import { useEffect, useState } from "react"
import { useGlobalContext } from "../context"
import { CircularProgress, Pagination, Stack } from "@mui/material"
import { useRouter } from "next/navigation"
import Image from "next/image"
import './[movieId]/styles.css'
import  Pagnation  from "../component/Pagination"
export default function page({params}) {
    const [page,setPage] = useState(1)
    const route=useRouter()
    const {trendingMovies,getTrendingMovies,trendingMoviesIsLoading}=useGlobalContext()
    useEffect(()=> {
        getTrendingMovies(params.showtype,page)
    },[page])
    return (<>
    <center> <h2 style={{fontSize:'40px',fontWeight:'600',color:'#fff'}}>{params.showtype}</h2></center>
        <div className='container_detail'>
           
        {trendingMoviesIsLoading ? <CircularProgress color="inherit" />:
        <div className="content person_shows">
            
            {trendingMovies.results?.map(i=> (
                <div className="trending_image_card" onClick={()=>route.push('/person/'+i.id)}>
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
        <Pagnation setPage={setPage} page={page} count={trendingMovies.total_pages} />
                </>
    )
}