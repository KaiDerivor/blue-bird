import React from "react"
import { CommonHeader } from "../common/CommonHeader"
import Typography from '@mui/material/Typography'
import { Container } from "@mui/system"
import { Footer } from "../Footer/Footer"
import Box from "@mui/material/Box"
//@ts-ignore
import styles from './style.module.scss'
import { CoursesList } from "./CoursesList"
import { Route, Routes, useParams } from "react-router-dom"
import { CourseCategory } from "./CourseCategory"
import { CourseItem } from './CourseItem'
import { CourseItemHeader } from "../common/CourseItemHeader"
import Fade from '@mui/material/Fade'

export const Courses =React.memo(() => {
   let isId = true;
   const params = useParams()['*']?.split('/');
   if (params) {
      isId = params.length > 1
   }
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
                        <Route path="/" element={<CoursesList />} />
                        <Route path="/:category" element={<CourseCategory />} />
                        <Route path="/:category/:id" element={<CourseItem />} />
                     </Routes>
                  </Box>
               </Container>
               <Footer />
            </Box>
         </Fade>

      </>
   )
})