import { CommonHeader } from "../common/CommonHeader"
import Typography from '@mui/material/Typography'
import { Container } from "@mui/system"
import { Footer } from "../Footer/Footer"
import Box from "@mui/material/Box"
import styles from './style.module.scss'
import { CoursesList } from "./CoursesList"
import { Route, Routes } from "react-router-dom"
import { CoursesCategory } from "./CoursesCategory"


export const Courses = () => {
   return (
      <>
         <CommonHeader title="Курси" subtitle='Усі завдання попередніх років включно з пробними та додатковими сесіями. Бонус: додаткові тести ' />
         <Container maxWidth="xl">
            <Routes>
               <Route path="/" element={<CoursesList />} />
               <Route path="/:category" element={<CoursesCategory/>} />
            </Routes>
         </Container>
         <Footer />
      </>
   )
}