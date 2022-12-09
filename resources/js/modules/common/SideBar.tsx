import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import HubIcon from '@mui/icons-material/Hub';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ClassIcon from '@mui/icons-material/Class';
import AppsIcon from '@mui/icons-material/Apps';

type SideBarType = {
   isOpenSideMenu: boolean
   setIsOpenSideMenu: (arg1: boolean) => void
}
export const SideBar: React.FC<SideBarType> = ({ isOpenSideMenu, setIsOpenSideMenu }) => {


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
               onClick={() => setIsOpenSideMenu(false)}
               onKeyDown={() => setIsOpenSideMenu(false)}
            >
               <List>
                  <ListItem disablePadding>
                     <ListItemButton className={''}>
                        <ListItemIcon className={''}>
                           <HubIcon />
                        </ListItemIcon>
                        <ListItemText primary={
                           <Typography variant="subtitle1" color="info" noWrap>Головна</Typography>
                        } />
                     </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                     <ListItemButton className={''}>
                        <ListItemIcon className={''}>
                           <FolderSharedIcon />
                        </ListItemIcon>
                        <ListItemText primary={
                           <Typography variant="subtitle1" color="info" noWrap>Профіль</Typography>
                        } />
                     </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                     <ListItemButton className={''}>
                        <ListItemIcon className={''}>
                           <ClassIcon />
                        </ListItemIcon>
                        <ListItemText primary={
                           <Typography variant="subtitle1" color="info" noWrap>Збережені</Typography>
                        } />
                     </ListItemButton>
                  </ListItem>

                  <ListItem disablePadding>
                     <ListItemButton className={''}>
                        <ListItemIcon className={''}>
                           <AppsIcon />
                        </ListItemIcon>
                        <ListItemText primary={
                           <Typography variant="subtitle1" color="info" noWrap>Курси</Typography>
                        } />
                     </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                     <ListItemButton className={''}>
                        <ListItemIcon className={''}>
                           <AppsIcon />
                        </ListItemIcon>
                        <ListItemText primary={
                           <Typography variant="subtitle1" color="info" noWrap>Admin</Typography>
                        } />
                     </ListItemButton>
                  </ListItem>
               </List>

            </Box>
         </Drawer>
      </div >
   );
}