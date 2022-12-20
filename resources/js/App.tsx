import React, { Suspense, useEffect, useState } from 'react'
import './App.css';
import { getAppTheme, getIsDarkMode, getIsInit, getIsSetData, getUserRole } from './redux/appSelector';
import { useDispatch, useSelector } from 'react-redux'
import { TopBar } from './modules/common/TopBar';
import { SideBarLargeScreen } from './modules/common/SideBarLargeScreen';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes, useParams } from 'react-router-dom';

import { ThemeProvider } from "@mui/material";
import { themeVariants } from './theme';

import { AlertBox } from './modules/common/AlertBox';
import { AppDispatch } from './redux/store';
import { setData } from './redux/appReducer';
import { Loader } from './modules/common/Loader';



const Profile = React.lazy(() => {
  return Promise.all([
    import('./modules/Profile/Profile'),
    new Promise(resolve => setTimeout(resolve, 800))
  ])
    .then(([Profile]) => Profile);
})
const Home = React.lazy(() => {
  return Promise.all([
    import('./modules/Home/Home'),
    new Promise(resolve => setTimeout(resolve, 800))
  ])
    .then(([Home]) => Home);
})
const Savings = React.lazy(() => {
  return Promise.all([
    import('./modules/Savings/Savings'),
    new Promise(resolve => setTimeout(resolve, 800))
  ])
    .then(([Savings]) => Savings);
})
const Courses = React.lazy(() => {
  return Promise.all([
    import('./modules/Courses/Courses'),
    new Promise(resolve => setTimeout(resolve, 800))
  ])
    .then(([Courses]) => Courses);
})
const FormLog = React.lazy(() => {
  return Promise.all([
    import('./modules/Auth/FormLog'),
    new Promise(resolve => setTimeout(resolve, 800))
  ])
    .then(([FormLog]) => FormLog);
})
const FormReg = React.lazy(() => {
  return Promise.all([
    import('./modules/Auth/FormReg'),
    new Promise(resolve => setTimeout(resolve, 800))
  ])
    .then(([FormReg]) => FormReg);
})
const AdminPage = React.lazy(() => {
  return Promise.all([
    import('./modules/Admin/AdminPage'),
    new Promise(resolve => setTimeout(resolve, 800))
  ])
    .then(([AdminPage]) => AdminPage);
})
const drawerWidth = 60;

function App() {

  const dispatch: AppDispatch = useDispatch()

  const isDarkMode = useSelector(getIsDarkMode);
  const isSetData = useSelector(getIsSetData)
  const userRole = useSelector(getUserRole)
  const isInit = useSelector(getIsInit)
  const appTheme = useSelector(getAppTheme)
  const [themeMode, setTheme] = useState(isDarkMode ? 'Dark' : 'Light')
  const [currTheme, setCurrTheme] = useState(themeVariants['config' + themeMode + appTheme])

  useEffect(() => {
    setCurrTheme(themeVariants['config' + themeMode + appTheme])
  }, [appTheme])

  useEffect(() => {
    return () => {
      if (isInit && !isSetData) {
        //@ts-ignore
        dispatch(setData())
      }
    }
  }, [])
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [useParams()])

  const toggleThemeMod = () => {
    const toggleMode = themeMode === 'Light' ? 'Dark' : 'Light'
    setTheme(toggleMode)
    setCurrTheme(themeVariants['config' + toggleMode + appTheme])
  }

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={currTheme}>
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
              position={'relative'}
              sx={{ flexGrow: 1, bgcolor: 'background.default' }}
            >
              <AlertBox />

              {/* <Loader /> */}
              <Box sx={{ pr: 1, pl: 1, pt: 1 }}>
                <Routes>
                  <Route path='/' element={
                    <Suspense fallback={<Loader />}>
                      <Home />
                    </Suspense>
                  } />
                  <Route path='/profile' element={
                    <Suspense fallback={<Loader />}>
                      <Profile />
                    </Suspense>
                  } />
                  <Route path='/savings' element={
                    <Suspense fallback={<Loader />}>
                      <Savings />
                    </Suspense>
                  } />
                  <Route path='/courses/*' element={
                    <Suspense fallback={<Loader />}>
                      <Courses />
                    </Suspense>
                  } />
                  <Route path='/login' element={
                    <Suspense fallback={<Loader />}>
                      <FormLog />
                    </Suspense>
                  } />
                  <Route path='/register' element={
                    <Suspense fallback={<Loader />}>
                      <FormReg />
                    </Suspense>
                  } />
                  {userRole === 'admin' && (<>
                    <Route path='/admin/*' element={
                      <Suspense fallback={<Loader />}>
                        <AdminPage />
                      </Suspense>
                    } />
                  </>
                  )}
                  <Route path='/*' element={<div>404</div>} />
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