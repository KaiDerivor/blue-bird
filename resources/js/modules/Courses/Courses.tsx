import React, { Suspense, useEffect } from "react"
import { CommonHeader } from "../common/CommonHeader"
import { Container } from "@mui/system"
import { Footer } from "../Footer/Footer"
import Box from "@mui/material/Box"
//@ts-ignore
import styles from './style.module.scss'
import { Route, Routes, useParams } from "react-router-dom"
import Fade from '@mui/material/Fade'
import { Loader } from "../common/Loader"

const CourseCategory = React.lazy(() => {
   return Promise.all([import("./CourseCategory"),
   new Promise(resolve => setTimeout(resolve, 800))
   ]).then(([CourseCategory]) => CourseCategory)
})
const CoursesList = React.lazy(() => {
   return Promise.all([import("./CoursesList"),
   new Promise(resolve => setTimeout(resolve, 800))
   ]).then(([CoursesList]) => CoursesList)
})
const CourseItem = React.lazy(() => {
   return Promise.all([import('./CourseItem'),
   new Promise(resolve => setTimeout(resolve, 800))
   ]).then(([CourseItem]) => CourseItem)
})
const Courses = React.memo(() => {
   let isId = true;
   const params = useParams()['*']?.split('/');
   if (params) {
      isId = params.length > 1
   }
   useEffect(() => {
      window.scrollBy({ top: 0, left: 0, behavior: 'smooth' })
   }, [useParams()])

   return (
      <>
         <Fade in={true} timeout={500} style={{ transitionDelay: '500ms' }}>
            <Box>

               {!isId || params === undefined ?
                  <CommonHeader title="Курси"
                     subtitle='Усі завдання попередніх років включно з пробними та додатковими сесіями. Бонус: додаткові тести ' />
                  : ''
               }
               <Container maxWidth="xl">
                  <Box>
                     <Routes>

                        <Route path="/:category" element={
                           <Suspense fallback={<Loader />}>
                              <CourseCategory />
                           </Suspense>
                        } />
                        <Route path="/:category/:id" element={
                           <Suspense fallback={<Loader />}>
                              <CourseItem />
                           </Suspense>
                        } />
                        <Route path="/" element={
                           <Suspense fallback={<Loader />}>
                              <CoursesList />
                           </Suspense>
                        } />
                     </Routes>
                  </Box>
               </Container>
               <Footer />
            </Box>
         </Fade>

      </>
   )
})
export default Courses