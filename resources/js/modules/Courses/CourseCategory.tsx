import { NavLink, useParams } from "react-router-dom"
import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box"
//@ts-ignore
import styles from './style.module.scss'
import { useDispatch, useSelector } from "react-redux"
import { getCategories, getChapterInfo, getIsDarkMode, getIsSetData, getLikedCategories, getThemesList } from "../../redux/appSelector"
import { ButtonNavigate } from "../common/ButtonNavigate"
import React, { useEffect, useState } from 'react'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import { CategoryType, getCategoriesInit } from "../../redux/catReducer"
import { detectCategory } from "../utils/detectCategory"
import { appActions, FormDataMeUpdateType, updateMe } from "../../redux/appReducer"
import { getThemesInit, ThemeType } from "../../redux/themeReducer"
import Paper from "@mui/material/Paper"




type BodyCourseCategory = {
   toggleShowingTasks: () => void
   currCategory: CategoryType
}

const BodyCourseCategory: React.FC<BodyCourseCategory> = ({ toggleShowingTasks, currCategory }) => {



   const dispatch: any = useDispatch()

   const likedCategories = useSelector(getLikedCategories)
   const chart = useSelector(getChapterInfo)
   const isUserInit = useSelector(getIsSetData)
   const [isCategoryAdded, setisCategoryAdded] = useState(likedCategories.includes(currCategory.id))

   const [isCategoryChapterShow, setisCategoryChapterShow] = useState(() => {
      return chart.hasOwnProperty(currCategory.id) && chart[currCategory.id].isShow
   })


   useEffect(() => {
      setisCategoryAdded(likedCategories.includes(currCategory.id))
      setisCategoryChapterShow(() => (chart.hasOwnProperty(currCategory.id) && chart[currCategory.id].isShow))
   }, [chart, likedCategories])
   const getNumberOfDisplayedChapers = () => {
      let count = 0;
      for (const key in chart) {
         if (Object.prototype.hasOwnProperty.call(chart, key)) {
            const element = chart[key];
            count += +element.isShow
         }
      }
      return count > 3
   }
   const configAddToProfileHandler = (isChecked: boolean) => {
      if (likedCategories.length > 4 && isChecked) {
         dispatch(appActions.setErrorText('Максимум збережених предметів: 5'))
         return
      }
      const sendMe = {
         likedCategories: isChecked
            ? [...likedCategories, currCategory.id]
            : likedCategories.filter(id => id !== currCategory.id)
      }
      dispatch(updateMe(sendMe as FormDataMeUpdateType));

   }
   const configAddToChart = (isChartDisplay: boolean) => {
      if (getNumberOfDisplayedChapers() && isChartDisplay) {
         dispatch(appActions.setErrorText('Максимум предметів на графіку: 4'))
         return
      }
      const sendMe = {
         chart: JSON.stringify({ ...chart, [currCategory.id]: { ...chart[currCategory.id], isShow: isChartDisplay } })
      }
      dispatch(updateMe(sendMe as FormDataMeUpdateType));
   }
   return (
      <Box>
         <Box sx={{ pb: 3 }}>
            <ButtonNavigate fn={toggleShowingTasks} title="Показати завдання по темам" subtitle="Усі завдання по певних темах" />
         </Box>
         <Box className={styles.wrapperCourse}>
            <Box className={styles.wrapperCourse__body}>
               <Typography variant="h3" color="fpage.main" sx={{ pb: 4 }}>{currCategory.title}</Typography>
               <Box className={styles.boxSession} sx={{ mb: 5 }}>
                  <Box className={styles.boxSession__list}>
                     {currCategory.tags?.length
                        ? currCategory?.tags.map((tag) => {
                           return <Typography key={tag.id} variant="body1" color="fpage.main"><NavLink to={tag.textUrl} style={{ color: 'inherit' }}>{tag.title}</NavLink> </Typography>
                        })
                        : <Typography variant="h5" color="fpage.main" sx={{ pb: 4 }}>Не має доступних тестів</Typography>
                     }

                  </Box>
               </Box>


            </Box>
            <Box className={styles.wrapperCourse__side} sx={{ backgroundColor: 'bgmode.main' }}>
               <Typography variant="h6" color="fpage.main" sx={{ textAlign: 'center' }}>Налаштування</Typography>
               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>

                  <FormControlLabel
                     value="start"
                     control={
                        <Switch color="warning"
                           onChange={(el) => configAddToProfileHandler(el.target.checked)}
                           checked={isCategoryAdded} disabled={!isUserInit} />
                     }
                     label="Добавити до профілю"
                     labelPlacement="start"
                  />
                  <FormControlLabel
                     value="start"
                     control={<Switch color="warning"
                        onChange={(el) => { configAddToChart(el.target.checked) }}
                        checked={isCategoryChapterShow} disabled={!isUserInit} />
                     }
                     label="Показувати на графіку"
                     labelPlacement="start"
                  />
               </Box>

            </Box>
         </Box>

      </Box>
   )
}

const BodyCourseTasks: React.FC<BodyCourseCategory> = React.memo(({ toggleShowingTasks, currCategory }) => {

   const dispatch: any = useDispatch()

   const themes = useSelector(getThemesList)
   useEffect(() => {
      return () => {
         if (currCategory?.id)
            dispatch(getThemesInit(`${currCategory.id}`))
      };
   }, [currCategory])

   const renderThemes = () => {
      if (!(themes.length > 0)) return <div></div>

      let ret = themes.map((theme: ThemeType) => {
         return <NavLink to={theme.textUrl}>

            <Paper className={styles.itemTheme}
               sx={{ color: 'fpage.light', backgroundColor: 'bgmode.main', mb: 3 }}
               elevation={2}
            >
               <Typography variant="h6" color="inherit">{theme.title}</Typography>
               <Typography variant="body1" color="inherit">{theme.description}</Typography>
            </Paper>
         </NavLink>
      })


      return ret
   }

   return (
      <Box>
         <Box sx={{ pb: 3 }}>
            <ButtonNavigate fn={toggleShowingTasks} title="Показати завдання за роками" subtitle="Усі завдання за роками" />
         </Box>
         <Box sx={{ pb: 2 }}>
            <Typography variant="h4" sx={{ color: 'fpage.main' }}>Теми:</Typography>
         </Box>
         <Box>
            {renderThemes()}
         </Box>
      </Box>
   )
})

const CourseCategory = React.memo(() => {
   const dispatch: any = useDispatch()
   const params = useParams();

   const [isShowTaskByCategory, setIsShowTaskByCategory] = useState(false)
   const categories: Array<CategoryType> = useSelector(getCategories)
   const currCategory = detectCategory(categories, params);

   useEffect(() => {
      return () => {
         if (categories.length < 1)
            dispatch(getCategoriesInit())
      };
   }, [])
   const toggleShowingTasks = () => {
      setIsShowTaskByCategory(prev => !prev)
   }
   return (
      <>
         {isShowTaskByCategory
            ? <BodyCourseTasks toggleShowingTasks={toggleShowingTasks} currCategory={currCategory} />
            : <BodyCourseCategory toggleShowingTasks={toggleShowingTasks} currCategory={currCategory} />}
      </>
   )
})
export default CourseCategory