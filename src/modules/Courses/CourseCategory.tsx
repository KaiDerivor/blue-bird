import { NavLink, useParams } from "react-router-dom"
import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box"
import styles from './style.module.scss'
import { useSelector } from "react-redux"
import { getIsDarkMode } from "../../redux/appSelector"
import { ButtonNavigate } from "../common/ButtonNavigate"
import { useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

type BodyCourseCategory = {
   toggleShowingTasks: () => void
}

const BodyCourseCategory: React.FC<BodyCourseCategory> = ({ toggleShowingTasks }) => {
   const isDarkMode = useSelector(getIsDarkMode)
   const navLinkStyles = {
      color: isDarkMode ? '#E3E3E3' : '#717171'
   }
   const configAddToProfileHandler = () => {
      console.log('sdfgg')
   }
   return (
      <>
         <ButtonNavigate fn={toggleShowingTasks} title="Показати завдання по темам" subtitle="Усі завдання по певних теиах" />
         <Box className={styles.wrapperCourse}>
            <Box className={styles.wrapperCourse__body}>
               <Typography variant="h3" color="fpage.main" sx={{ pb: 4 }}>Математика</Typography>
               <Box className={styles.boxSession} sx={{ mb: 5 }}>
                  <Typography variant="h6" color="fpage.main" sx={{ pb: 2 }}>2022</Typography>
                  <Box className={styles.boxSession__list}>
                     <Typography variant="body1" color="fpage.main"><NavLink to={`2022-a`} style={navLinkStyles}>2022-A</NavLink> </Typography>
                     <Typography variant="body1" color="fpage.main"><NavLink to={`2022-b`} style={navLinkStyles}>2022-Б</NavLink></Typography>
                     <Typography variant="body1" color="fpage.main"><NavLink to={`2022-c`} style={navLinkStyles}>2022 Пробна</NavLink></Typography>
                  </Box>
               </Box>

               <Box className={styles.boxSession} sx={{ mb: 5 }}>
                  <Typography variant="h6" color="fpage.main" sx={{ pb: 2 }}>2022</Typography>
                  <Box className={styles.boxSession__list}>
                     <Typography variant="body1" color="fpage.main">2022-A</Typography>
                     <Typography variant="body1" color="fpage.main">2022-Б</Typography>
                     <Typography variant="body1" color="fpage.main">2022 Пробна</Typography>
                  </Box>
               </Box>

               <Box className={styles.boxSession} sx={{ mb: 5 }}>
                  <Typography variant="h6" color="fpage.main" sx={{ pb: 2 }}>2022</Typography>
                  <Box className={styles.boxSession__list}>
                     <Typography variant="body1" color="fpage.main">2022-A</Typography>
                     <Typography variant="body1" color="fpage.main">2022-Б</Typography>
                     <Typography variant="body1" color="fpage.main">2022 Пробна</Typography>
                  </Box>
               </Box>

               <Box className={styles.boxSession} sx={{ mb: 5 }}>
                  <Typography variant="h6" color="fpage.main" sx={{ pb: 2 }}>2022</Typography>
                  <Box className={styles.boxSession__list}>
                     <Typography variant="body1" color="fpage.main">2022-A</Typography>
                     <Typography variant="body1" color="fpage.main">2022-Б</Typography>
                     <Typography variant="body1" color="fpage.main">2022 Пробна</Typography>
                  </Box>
               </Box>
            </Box>
            <Box className={styles.wrapperCourse__side} sx={{ backgroundColor: 'bgmode.main' }}>
               <Typography variant="h6" color="fpage.main" sx={{ textAlign: 'center' }}>Налаштування</Typography>
               <Box sx={{ display: 'flex', flexDirection: 'column',alignItems:'flex-start' }}>

                  <FormControlLabel
                     value="start"
                     control={<Switch color="warning" onChange={() => configAddToProfileHandler()} />}
                     label="Добавити до профілю"
                     labelPlacement="start"
                  />
                  <FormControlLabel
                     value="start"
                     control={<Switch color="warning" onChange={() => configAddToProfileHandler()} />}
                     label="Показувати на графіку"
                     labelPlacement="start"
                  />
               </Box>

            </Box>
         </Box>

      </>
   )
}

const BodyCourseTasks: React.FC<BodyCourseCategory> = ({ toggleShowingTasks }) => {
   return (
      <>
         <ButtonNavigate fn={toggleShowingTasks} title="Показати завдання за роками" subtitle="Усі завдання за роками" />
         <Box>ijgdfpiogjd</Box>
      </>
   )
}


export const CourseCategory = () => {
   const category = useParams().category

   const [isShowTaskByCategory, setIsShowTaskByCategory] = useState(false)


   const toggleShowingTasks = () => {
      setIsShowTaskByCategory(prev => !prev)
   }
   return (
      <>
         {isShowTaskByCategory
            ? <BodyCourseTasks toggleShowingTasks={toggleShowingTasks} />
            : <BodyCourseCategory toggleShowingTasks={toggleShowingTasks} />}
      </>
   )
}