import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { SideBar } from './SideBar';

export const TopBar: React.FC = () => {

   const [isOpenSideMenu, setIsOpenSideMenu] = useState(false)

   return (
      <>
         <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
               <Toolbar>
                  <IconButton
                     size="large"
                     edge="start"
                     color="inherit"
                     aria-label="menu"
                     sx={{ mr: 2 }}
                     onClick={()=>setIsOpenSideMenu(true)}
                  >
                     <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                     News
                  </Typography>
                  <Button color="inherit">Login</Button>
                  <Button color="inherit">Login</Button>
                  <Button color="inherit">Login</Button>
                  <Button color="inherit">Login</Button>
               </Toolbar>
            </AppBar>
         </Box>
         <SideBar isOpenSideMenu={isOpenSideMenu} setIsOpenSideMenu={setIsOpenSideMenu} />
      </>

   );
}