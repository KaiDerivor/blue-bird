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
import { NavLink } from 'react-router-dom';
//@ts-ignore
import styles from './stylesSB.module.scss'
import { ToggleThemeMode } from './ToggleThemeButton';
import { useSelector } from 'react-redux';
import { getUserRole } from '../../redux/appSelector';
import { ROLE_ADMIN } from '../../redux/userReducer';


type SideBarType = {
   isOpenSideMenu: boolean
   setIsOpenSideMenu: (arg1: boolean) => void
   toggleThemeMode: () => void
}
export const SideBar: React.FC<SideBarType> = ({ isOpenSideMenu, setIsOpenSideMenu, toggleThemeMode }) => {
   const userRole = useSelector(getUserRole)

   return (
      <div>
         <Drawer
            anchor='left'
            open={isOpenSideMenu}
            onClose={() => { setIsOpenSideMenu(false) }}
         >
            <Box
               className='rowColumn'
               role="presentation"
               sx={{ width: '250px', height: '100%' }}
               onClick={() => setIsOpenSideMenu(false)}
               onKeyDown={() => setIsOpenSideMenu(false)}
            >
               <List sx={{ flexGrow: 1 }}>
                  <ListItem disablePadding>
                     <NavLink to='/' className={styles.sidebarLink}>
                        <ListItemButton className={''} >
                           <ListItemIcon className={''}>
                              <HubIcon />
                           </ListItemIcon>
                           <ListItemText primary={
                              <Typography variant="subtitle1" color="info" noWrap>Головна</Typography>
                           } />
                        </ListItemButton>
                     </NavLink>
                  </ListItem>

                  <ListItem disablePadding>
                     <NavLink to="/profile" className={styles.sidebarLink}>
                        <ListItemButton className={''}>
                           <ListItemIcon className={''}>
                              <FolderSharedIcon />
                           </ListItemIcon>
                           <ListItemText primary={
                              <Typography variant="subtitle1" color="info" noWrap>Профіль</Typography>
                           } />
                        </ListItemButton>
                     </NavLink>
                  </ListItem>

                  <ListItem disablePadding>
                     <NavLink to="/savings" className={styles.sidebarLink}>
                        <ListItemButton className={''}>
                           <ListItemIcon className={''}>
                              <ClassIcon />
                           </ListItemIcon>
                           <ListItemText primary={
                              <Typography variant="subtitle1" color="info" noWrap>Збережені</Typography>
                           } />
                        </ListItemButton>
                     </NavLink>
                  </ListItem>

                  <ListItem disablePadding>
                     <NavLink to="/courses" className={styles.sidebarLink}>
                        <ListItemButton className={''}>
                           <ListItemIcon className={''}>
                              <AppsIcon />
                           </ListItemIcon>
                           <ListItemText primary={
                              <Typography variant="subtitle1" color="info" noWrap>Предмети</Typography>
                           } />
                        </ListItemButton>
                     </NavLink>
                  </ListItem>
                  {userRole === ROLE_ADMIN &&
                     <ListItem disablePadding>
                        <NavLink to="/admin" className={styles.sidebarLink}>
                           <ListItemButton className={''}>
                              <ListItemIcon className={''}>
                                 <AppsIcon />
                              </ListItemIcon>
                              <ListItemText primary={
                                 <Typography variant="subtitle1" color="info" noWrap>Admin</Typography>
                              } />
                           </ListItemButton>
                        </NavLink>
                     </ListItem>
                  }
               </List>
               <Box sx={{}}>
                  <ToggleThemeMode toggleThemeMode={toggleThemeMode} />
               </Box>
            </Box>
         </Drawer>
      </div >
   );
}