"use client"
import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import  filterHeader from '../app/filterHeader';
import TemporaryDrawer from './component/Drawer';
import Image from 'next/image';
import noImage from './images/no-image-icon.jpg'
import { useRouter } from 'next/navigation'
import { Searchbar } from './Searchbar';
import './styles.css'
import { Select } from '@mui/material';
import logo from './logo-no-background.png'




export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
 //const {movies,movieIsLoading,genres,popularMovies,nowPlaying,nowPlayingIsLoading,getPopularMovies,getGenres,getNowPlaying,getMovies}= useGlobalContext()


  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
 
  const scrollDirection=filterHeader()
  const route = useRouter()


 
  
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
           
          </Badge>
        </IconButton>
       
      </MenuItem>
      
    </Menu>
  );

  return (
    <div>
     <Box >
      <AppBar  sx={{'& .MuiToolbar-root':  {background:'#11001C', position:"sticky", top:'0', "z-index":'1'}}} >
      {scrollDirection =='up' && <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
          <div className='logo'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <TemporaryDrawer toggleDrawer={toggleDrawer} open={open} setOpen={setOpen} />
          <Typography
            variant="h6"
            noWrap
            component="div"
           className='web_logo'
          >
           <Image style={{cursor:'pointer'}} onClick={()=> route.push('/')} src={logo} />
          </Typography>
          </div>
          <div className='web_view_search'>
          <Searchbar  />
</div>

          <div>
         
         
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            
            
          </Box>
          </div>
        </Toolbar> }
      <div className='mobile_view_search' sx={{    width: '100%',
    display: 'flex',
    justifyContent: 'center'}}>
          <Searchbar id='searchbar_mobile' />
</div>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
   
   
</Box>
    </div>
  );
}
