import React, { useEffect, useState } from 'react'
import './App.css';
import { getIsDarkMode, getIsInit, getIsSetData } from './redux/appSelector';
import { useDispatch, useSelector } from 'react-redux'
import { TopBar } from './modules/common/TopBar';
import { SideBarLargeScreen } from './modules/common/SideBarLargeScreen';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, useParams } from 'react-router-dom';
import { Home } from './modules/Home/Home';
import { Profile } from './modules/Profile/Profile';
import { Savings } from './modules/Savings/Savings'
import { Courses } from './modules/Courses/Courses';
import { Slide, ThemeProvider } from "@mui/material";
import { darkTheme, lightTheme } from './theme';
import Fade from '@mui/material/Fade'
import { useLocation } from 'react-router-dom';
import { FormLog } from './modules/Auth/FormLog';
import { FormReg } from './modules/Auth/FormReg';
import { useNavigate } from 'react-router-dom';
import { AlertBox } from './modules/common/AlertBox';
import { AppDispatch } from './redux/store';
import { setData } from './redux/appReducer';

const drawerWidth = 60;

function App() {

  const dispatch: AppDispatch = useDispatch()

  const isDarkMode = useSelector(getIsDarkMode);
  const isSetData = useSelector(getIsSetData)

  useEffect(() => {
    if (!isSetData) {
      dispatch(setData())
    }
  }, [isSetData])

  const [theme, setTheme] = useState(isDarkMode ? 'dark' : 'light')


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
              <AlertBox />

              <Box>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/savings' element={<Savings />} />
                  <Route path='/courses/*' element={<Courses />} />
                  <Route path='/login' element={<FormLog />} />
                  <Route path='/register' element={<FormReg />} />
                  <Route path='/*' element={<Home />} />
                </Routes>
              </Box>
            </Box >
          </Box>
        </div>
      </ThemeProvider >
    </>

  );
}

export default App;
