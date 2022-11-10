import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useState } from 'react';

type SideBarType={
   isOpenSideMenu:boolean
   setIsOpenSideMenu:(arg1:boolean)=>void
}
export const SideBar:React.FC<SideBarType> = ({isOpenSideMenu,setIsOpenSideMenu}) => {


   return (
      <div>
         <Drawer
            anchor='left'
            open={isOpenSideMenu}
            onClose={() => { setIsOpenSideMenu(false) }}
         >
            <Box
               role="presentation"
               sx={{ width: '250px' }}
               onClick={()=>setIsOpenSideMenu(false)}
               onKeyDown={()=>setIsOpenSideMenu(false)}
            >
               <List>
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
               </List>
               <Divider />
               <List>
                  {['All mail', 'Trash', 'Spam'].map((text, index) => (
                     <ListItem key={text} disablePadding>
                        <ListItemButton>
                           <ListItemIcon>
                              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                           </ListItemIcon>
                           <ListItemText primary={text} />
                        </ListItemButton>
                     </ListItem>
                  ))}
               </List>
            </Box>
         </Drawer>
      </div >
   );
}