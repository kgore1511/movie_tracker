import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './styles.css'
import  {Select}  from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Image from 'next/image';
import noImage from './[showtype]/[movieId]/no-image-icon.jpg'
import { useGlobalContext } from './context';
import { useRouter } from 'next/navigation';

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#35012C',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(0),
    marginLeft: 0,
    borderLeft:1,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(0),
      width: '100%',
    },
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));

export const Searchbar=()=> {
  const router = useRouter()
    const {getSearchResult,searchResults} = useGlobalContext()
    const searchTypeRef=React.useRef('multi')
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }
 

  
  const searchHandler=debounce((e)=> {
    getSearchResult(searchTypeRef.current.value,e.target.value)
  },3000)
    return (
        <div className='searchbar'>
         <select ref={searchTypeRef} onChange={(e)=>{searchTypeRef.current.value=e.target.value}} className='combobox'>
         <option selected value='multi'>All</option>
          <option value='movie'>Movies</option>
          <option value='tv'>TV Shows</option>
         </select>
          <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              onChange={(e)=>searchHandler(e)}
              inputProps={{ 'aria-label': 'search' }}
            />
          
          <div id='suggestionbox' className='suggestionbox' >
            {
              searchResults?.map((i)=> (
                <div className='suggestion_row'>
                <div> <Image width='50' borderRadius='10px' height='50' src={i.profile_path? 'http://image.tmdb.org/t/p/w500'+i.profile_path:
                i.poster_path? 'http://image.tmdb.org/t/p/w500'+i.poster_path:
                noImage} /></div>
                <div onClick={()=>router.push('/'+i.media_type+'/'+i.id)}>
                <div className='search_name' >{i.name?<div> {i.name} </div>:<div>{i.title}</div>}</div>
                <div className='light_text'>{i.media_type}</div>
                <div className='light_text'>{i.release_date}</div>
                </div>
                </div>
              ))
            }
          </div>
          </Search>
          </div>
    )
}