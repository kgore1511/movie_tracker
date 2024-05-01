import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './styles.css'
import  {CircularProgress, InputAdornment, Select}  from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Image from 'next/image';
import noImage from '../app/images/no-image-icon.jpg'
import { useGlobalContext } from './context';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import { Close } from '@mui/icons-material';
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
  const [visible,setVisible] = useState(false)
  const [keyword,setKeyword] = useState('')
  const router = useRouter()
    const {getSearchResult,searchResults,searchResultsIsLoading} = useGlobalContext()
    const searchTypeRef=React.useRef('multi')
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    }
  }

  
  const searchHandler=debounce((e)=> {
    getSearchResult(searchTypeRef.current.value,keyword)
  },3000)
    return (
        <div className='searchbar'>
         <select ref={searchTypeRef} onChange={(e)=>{searchTypeRef.current.value=e.target.value}} className='combobox'>
         <option defaultValue='multi' value='multi'>All</option>
          <option value='movie'>Movies</option>
          <option value='tv'>TV Shows</option>
         </select>
          <Search >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>

            <StyledInputBase
            fullWidth={true}
              placeholder="Search…"
              className='search_input'
              value={keyword}
              onChange={(e)=>{
                setKeyword(e.target.value)
                searchHandler(e)
                if(e.target.value.length>0) setVisible(true)
                else setVisible(false)
              }}
              inputProps={{ 'aria-label': 'search' }}
              sx={{
                '& .MuiInputBase-input':
                {width:'100% !important'}
              }}
              endAdornment={visible && <InputAdornment position="end"><CloseIcon className='onhover' onClick={()=>{
                setKeyword('')
                setVisible(false)
              }} sx={{color:'#fff'}} /></InputAdornment>}
            ></StyledInputBase>
          
          {visible && <div id='suggestionbox' className='suggestionbox' >
            
              {searchResultsIsLoading ? <center><CircularProgress color='inherit' /></center>:
              searchResults.length==0 ? <center>No Results Found</center>:
              <div>{searchResults?.map((i)=> (
                <div key={i.id} onClick={()=>{
                  setVisible(false)
                  router.push('/show/'+i.media_type+'/'+i.id)}
                } className='suggestion_row onhover'>
                <div> <Image width='50' borderRadius='10px' height='50' src={i.profile_path? 'http://image.tmdb.org/t/p/w500'+i.profile_path:
                i.poster_path? 'http://image.tmdb.org/t/p/w500'+i.poster_path:
                noImage} /></div>
                <div>
                <div className='search_name' >{i.name?<div> {i.name} </div>:<div>{i.title}</div>}</div>
                <div className='light_text'>{i.media_type}</div>
                <div className='light_text'>{i.release_date}</div>
                </div>
                </div>
              ))
            }
            </div>
            }
          </div>}
          </Search>
          </div>
    )
}