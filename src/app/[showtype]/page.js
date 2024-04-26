"use client"
import { useEffect } from "react"
import { useGlobalContext } from "../context"
import { CircularProgress } from "@mui/material"
import { useRouter } from "next/navigation"
import Image from "next/image"
import './[movieId]/styles.css'
export default function page({params}) {
    const route=useRouter()
    const {trendingMovies,getTrendingMovies,trendingMoviesIsLoading}=useGlobalContext()
    useEffect(()=> {
        getTrendingMovies(params.showtype)
    },[])
    console.log(trendingMovies)
    return (
        <div className='container_detail'>
        {trendingMoviesIsLoading ? <CircularProgress color="inherit" />:
        <div className="content person_shows">
            {trendingMovies.results?.map(i=> (
                <div className="trending_image_card" onClick={()=>route.push('/person/'+i.id)}>
                    <div className="trending_image">
                    {i.media_type=='person' ?<Image fill src={'http://image.tmdb.org/t/p/w500'+i.profile_path} />:
                    <Image fill src={'http://image.tmdb.org/t/p/w500'+i.poster_path} /> }
                    </div>
                    <div className="popular_person_name">{i.name}</div>
                    </div>
            ))}
        </div>
        }
        </div>
    )
}