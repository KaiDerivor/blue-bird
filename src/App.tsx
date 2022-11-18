import { useEffect, useState } from 'react'
import './App.css';
import Typography from '@mui/material/Typography';
import { getIsDarkMode, getIsInit } from './redux/appSelector';
import { useSelector } from 'react-redux'
import { TopBar } from './modules/common/TopBar';
import { SideBarLargeScreen } from './modules/common/SideBarLargeScreen';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import { Home } from './modules/Home/Home';
import { Profile } from './modules/Profile/Profile';
import { Savings } from './modules/Savings/Savings'
import { Courses } from './modules/Courses/Courses';
import { createTheme, Slide, ThemeProvider, Zoom } from "@mui/material";
import { darkTheme, lightTheme } from './theme';
import Fade from '@mui/material/Fade'
import { useLocation } from 'react-router-dom';

const drawerWidth = 60;
function App() {

  const isDarkMode = useSelector(getIsDarkMode);
  const [theme, setTheme] = useState(isDarkMode ? 'dark' : 'light')
  const [isOpenPage, setIsOpenPage] = useState(true)
  // const location = useLocation();
  // console.log(location)
  useEffect(() => {
    setIsOpenPage(false)
    setTimeout(() => {
      setIsOpenPage(true)
      window.scrollTo(0,0)
    }, 400)
  }, [useLocation()])
  const toggleThemeMod = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
        <div className="app">

          <Box className='app__wrapper'>
            <div className='topBar'>
              <TopBar />
            </div>
            <div className='SideBarLargeScreen'>
              <SideBarLargeScreen toggleThemeMod={toggleThemeMod} />
            </div>
            <CssBaseline />
            <Box
              component="main"
              sx={{ flexGrow: 1, bgcolor: 'background.default', p: 1 }}
            >
              <Fade in={isOpenPage} appear={false} unmountOnExit >
                <Slide in={isOpenPage} direction="up" timeout={700}>

                  <Box>
                    <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/profile' element={<Profile />} />
                      <Route path='/savings' element={<Savings />} />
                      <Route path='/courses' element={<Courses />} />
                      <Route path='/courses/*' element={<Courses />} />
                      <Route path='/*' element={<Home />} />
                    </Routes>
                  </Box>
                </Slide>
              </Fade>
            </Box >
          </Box>
        </div>
      </ThemeProvider >
    </>

  );
}

export default App;
