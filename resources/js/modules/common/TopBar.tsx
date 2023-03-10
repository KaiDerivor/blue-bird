import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { SideBar } from './SideBar';

type TopBarType = {
   toggleThemeMode: () => void
}
export const TopBar: React.FC<TopBarType> = ({ toggleThemeMode }) => {

   const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)

   return (
      <>
         <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
               <Toolbar sx={{ backgroundColor: 'bgmode.dark', color: 'fpage.main' }}>
                  <IconButton
                     size="large"
                     edge="start"
                     color="inherit"
                     aria-label="menu"
                     sx={{ mr: 2 }}
                     onClick={() => setIsOpenSideMenu(true)}
                  >
                     <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'inherit' }}>
                     Blue Bird
                  </Typography>
                  {/* <Button color="inherit">Login</Button> */}
               </Toolbar>
            </AppBar>
         </Box>
         <SideBar isOpenSideMenu={isOpenSideMenu} setIsOpenSideMenu={setIsOpenSideMenu} toggleThemeMode={toggleThemeMode} />
      </>

   );
}