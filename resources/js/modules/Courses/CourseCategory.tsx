import { NavLink, useParams } from "react-router-dom"
import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box"
//@ts-ignore
import styles from './style.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { getCategories, getIsDarkMode } from "../../redux/appSelector"
import { ButtonNavigate } from "../common/ButtonNavigate"
import React, { useDeferredValue, useEffect, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { CategoryRecordType, getCategoriesInit } from "../../redux/catReducer"
import { AppDispatch } from "../../redux/store"
import { detectCategory } from "../utils/detectCategory"

type BodyCourseCategory = {
   toggleShowingTasks: () => void
}

const BodyCourseCategory: React.FC<BodyCourseCategory> = ({ toggleShowingTasks }) => {

   const params = useParams();
   const dispatch: AppDispatch = useDispatch()

   const isDarkMode = useSelector(getIsDarkMode)
   const categories:Array<CategoryRecordType> = useSelector(getCategories)

   useEffect(() => {
      return () => {
         //@ts-ignore
         dispatch(getCategoriesInit())
      };
   }, [])
   const navLinkStyles = {
      color: isDarkMode ? '#E3E3E3' : '#717171'
   }


   const configAddToProfileHandler = () => {
      console.log('sdfgg')
   }
   const currCategory = detectCategory(categories,params);
   return (
      <>
         <ButtonNavigate fn={toggleShowingTasks} title="Показати завдання по темам" subtitle="Усі завдання по певних теиах" />
         <Box className={styles.wrapperCourse}>
            <Box className={styles.wrapperCourse__body}>
               <Typography variant="h3" color="fpage.main" sx={{ pb: 4 }}>{currCategory.title}</Typography>
               <Box className={styles.boxSession} sx={{ mb: 5 }}>
                  <Box className={styles.boxSession__list}>
                     {currCategory.tags?.length
                        ? currCategory?.tags.map((tag) => {
                           return <Typography key={tag.id} variant="body1" color="fpage.main"><NavLink to={tag.textUrl} style={navLinkStyles}>{tag.title}</NavLink> </Typography>
                        })
                        : <Typography variant="h5" color="fpage.main" sx={{ pb: 4 }}>Не має доступних тестів</Typography>
                     }
                     {/* <Typography variant="body1" color="fpage.main"><NavLink to={`2022-a`} style={navLinkStyles}>2022-A</NavLink> </Typography> */}
                     {/* <Typography variant="body1" color="fpage.main"><NavLink to={`2022-b`} style={navLinkStyles}>2022-Б</NavLink></Typography> */}
                     {/* <Typography variant="body1" color="fpage.main"><NavLink to={`2022-c`} style={navLinkStyles}>2022 Пробна</NavLink></Typography> */}
                  </Box>
               </Box>


            </Box>
            <Box className={styles.wrapperCourse__side} sx={{ backgroundColor: 'bgmode.main' }}>
               <Typography variant="h6" color="fpage.main" sx={{ textAlign: 'center' }}>Налаштування</Typography>
               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

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