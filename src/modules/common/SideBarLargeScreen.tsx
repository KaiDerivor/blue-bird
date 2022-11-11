import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import styles from './stylesSB.module.scss'
import HubIcon from '@mui/icons-material/Hub';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import ClassIcon from '@mui/icons-material/Class';
import AppsIcon from '@mui/icons-material/Apps';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/appReducer';
import { getIsDarkMode } from '../../redux/appSelector';

const drawerWidth = 85;

type MenuItemType = {
   linkUrl: string
   linkText: string
   Icon: JSX.Element
}
const MenuItem: React.FC<MenuItemType> = ({ linkUrl, linkText, Icon }) => {
   const themeMod=useSelector(getIsDarkMode);
   return (
      <ListItem disablePadding>
         <ListItemButton className={styles.listMenu__item}>
            <NavLink to={`/${linkUrl}`} className={`${styles.link} ${themeMod?styles.dark:styles.light}`}>
               <ListItemIcon className={styles.listMenu__itemIcon}>
                  {Icon}
               </ListItemIcon>
               <ListItemText primary={
                  <Typography variant="caption" color="info" noWrap>{linkText}</Typography>
               } />
            </NavLink>
         </ListItemButton>
      </ListItem>
   )
}

type SideBarType = {
   toggleThemeMod: () => void
}
export const SideBarLargeScreen: React.FC<SideBarType> = ({ toggleThemeMod }) => {
   const dispatch: AppDispatch = useDispatch();

   const [isLightMode, setIsLightMode] = useState(false)

   const toggleTheme = () => {
      setIsLightMode(prev => !prev)
      dispatch(actions.toggleThemeMod())
      toggleThemeMod();
   }
   return (<>
    
      <Drawer
         sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
               width: drawerWidth,
               boxSizing: 'border-box',
            },
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
         }}
         variant="permanent"
         anchor="left"
      >
         <List className={styles.listMenu} sx={{ flexGrow: 1 }}>
            <MenuItem linkUrl='' linkText="Головна" Icon={<HubIcon />} />
            <MenuItem linkUrl='profile' linkText="Профіль" Icon={<FolderSharedIcon />} />
            <MenuItem linkUrl='savings' linkText="Збережені" Icon={<ClassIcon />} />
            <MenuItem linkUrl='courses' linkText="Курси" Icon={<AppsIcon />} />
            {/* <MenuItem linkUrl='' linkText="Головна" Icon={<HubIcon />} /> */}
         </List>
         <Box sx={{ margin: ' 15px auto' }}>
            {/* switcher_lightMode */}
            <IconButton className={`${styles.switcher} ${isLightMode ? styles.switcher_lightMode : ''}`} sx={{ width: drawerWidth - 35 }} onClick={() => toggleTheme()}>
               <LightModeIcon className={styles.lightIcon} />
               <DarkModeOutlinedIcon className={styles.darkIncon} />
            </IconButton>
         </Box>

      </Drawer >
   </>
   );
}