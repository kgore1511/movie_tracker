import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useRouter } from 'next/navigation';
import MovieIcon from '@mui/icons-material/Movie';
import PersonIcon from '@mui/icons-material/Person';
import logo from '../logo-black.png'
import Image from 'next/image';
export default function TemporaryDrawer({toggleDrawer,open,setOpen}) {
  const route=useRouter()

  const DrawerList = (
    <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
      {/*<List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>*/}
      
      <List>
      
        <ListItem>
        <Image style={{cursor:'pointer'}} src={logo} />
        </ListItem>
          <ListItem  disablePadding>
            <ListItemButton onClick={()=>route.push('/show/movie')} >
            <ListItemIcon><MovieIcon/></ListItemIcon>
              <ListItemText>Movies</ListItemText>
            </ListItemButton>
            
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton onClick={()=>route.push('/show/person')} >
            <ListItemIcon><PersonIcon/></ListItemIcon>
              <ListItemText>Person</ListItemText>
            </ListItemButton>
            
          </ListItem>
       
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}