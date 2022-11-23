import React, { useEffect, useState } from 'react'
import './App.css';
import { getIsDarkMode, getIsInit, getIsSetData, getUserRole } from './redux/appSelector';
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
import { Categories } from './modules/Admin/Categories';
import { Tags } from './modules/Admin/Tags';
import { Tasks } from './modules/Admin/Tasks';
const drawerWidth = 60;

function App() {

  const dispatch: AppDispatch = useDispatch()

  const isDarkMode = useSelector(getIsDarkMode);
  const isSetData = useSelector(getIsSetData)
  const userRole = useSelector(getUserRole)

  useEffect(() => {
    if (!isSetData) {
      //@ts-ignore
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
                  {userRole && (<>
                    <Route path='/admin-categories/*' element={<Categories />} />
                    <Route path='/admin-tags/*' element={<Tags />} />
                    <Route path='/admin-tasks/*' element={<Tasks />} />
                    <Route path='/admin-users/*' element={<PH />} />
                  </>
                  )}
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

const PH = () => {
  return (
    <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae, dicta. Neque voluptatum minima ducimus autem asperiores qui officia consectetur iure facilis, explicabo maxime, obcaecati ea! Non impedit natus corporis aut?
      Quia nesciunt aliquam nostrum vitae, quae dolore corrupti natus! Nihil, porro odio! Corrupti recusandae distinctio ipsum accusantium! Voluptates amet, aliquam repellat provident explicabo id soluta inventore, iure aliquid eum odio?
      Nostrum laboriosam eum aperiam nisi sunt libero itaque, quis earum optio cupiditate dolore pariatur numquam laborum eaque deserunt, reiciendis nemo quia hic molestias autem eligendi minus vero tempore! Itaque, non!
      Omnis iure voluptatem velit eum qui ipsa consectetur eos incidunt. Dolorum possimus vitae explicabo, a ab tempora asperiores nostrum atque incidunt molestiae perspiciatis et? Cupiditate facilis aut accusamus unde voluptatem.
      Eveniet odio, placeat officiis aut soluta ex tempore rerum similique nulla quam vel sapiente iusto recusandae est repellat inventore explicabo dolorem magni? Dolorum recusandae aliquam iure incidunt saepe harum excepturi.
      Harum, asperiores et, expedita rem corporis, quaerat ipsam praesentium distinctio ad vitae sed fugit quas illo nemo tenetur rerum alias veniam mollitia ipsa minima nam laboriosam dolor. Veritatis, necessitatibus aliquam!
      Voluptatibus, itaque. Error commodi enim, consequatur ad laborum tempore! Obcaecati voluptates fugiat odio possimus, asperiores ex quam soluta praesentium, nihil commodi error ipsa maiores vitae similique officia tempora repellendus aperiam.
      Animi repellat reprehenderit eaque autem quisquam quae facilis, voluptatibus ex illo possimus provident sequi aperiam totam eius? Earum nostrum id autem aut quasi quisquam, mollitia corrupti, perspiciatis maiores, assumenda sequi?
      Laboriosam voluptatibus voluptate officiis optio animi at delectus tempore consectetur nihil accusantium odit nulla vel ut est laudantium fugit sequi vitae, modi quo nostrum ea libero repudiandae! Iusto, laborum deserunt.
      Incidunt, quos quis provident soluta aperiam quod facilis omnis vero dicta! Iure deleniti magnam debitis, sequi cumque reprehenderit consequuntur dolores maxime illum nesciunt eos qui tempora aliquam distinctio quo incidunt!</div>
  )
}