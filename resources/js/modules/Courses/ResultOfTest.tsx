import React, { createRef, Ref, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import { getResultTableInit, TaskType, WORST_RESULT } from '../../redux/taskReducer';
//@ts-ignore
import styles from './style.module.scss'
import { CategoryRecordType, CategoryType, getCategoryTagsInit } from '../../redux/catReducer';
import { TagRecordType, TagType } from '../../redux/tagReducer';
import { useDispatch, useSelector } from "react-redux"
import { getCategoryTagList, getChapterInfo, getIsSetData, getResultTables, getTableOfResult } from '../../redux/appSelector';
import Typography from '@mui/material/Typography'
import { TaskComponent } from './Task';
import { Button } from '@mui/material';
import { defineTaskPoint } from '../utils/defineTaskPoint';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { NavLink } from 'react-router-dom';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import { appActions, updateMe } from '../../redux/appReducer';
import { Scroll2Top } from '../common/Scroll2Top';

type ChartPairType = {
   [arg1: string]: number
}

type ResultOfTestType = {
   currCategory: CategoryType
   currTag: TagType
   test: Array<TaskType>
   userAnswers: any
   startTestAgainHandler: () => void
   time: number
   isAsThemeTest: boolean
}
export const ResultOfTest: React.FC<ResultOfTestType> = React.memo(({ currCategory, test, userAnswers, currTag, startTestAgainHandler, time, isAsThemeTest }) => {
   const dispatch: any = useDispatch()
   const isInitUser = useSelector(getIsSetData)
   const resultTable = useSelector(getResultTables)[0]
   const categoryTagInfo = useSelector(getCategoryTagList)[0]
   const chart = useSelector(getChapterInfo)
   const [maxPointTest, setMaxPoint] = useState(0)
   const [userPoint, setUserPoint] = useState(0)

   useEffect(() => {
      if (currCategory.id !== undefined && currTag.id !== undefined && !isAsThemeTest) {
         dispatch(getCategoryTagsInit(`${currCategory.id}`, `${currTag.id}`))
      }
   }, [currCategory, currTag])

   useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })

      dispatch(appActions.toggleFetchingOn());
      const timerId = setTimeout(() => { dispatch(appActions.toggleFetchingOff()) }, 1000)

      return () => {
         clearTimeout(timerId)
      }

   }, [])

   const displayAllTasks = () => {
      let tasks = [] as Array<JSX.Element>
      for (const task of test) {
         tasks.push(
            <Box key={task.id} >
               <TaskComponent key={task.id} task={task} currCategory={currCategory} currTag={currTag}
                  userAnswers={userAnswers} isAsAnswer />
            </Box>
         )
      }
      return tasks;
   }
   const getWastedTime = () => {
      const diffTime = Math.round((new Date().getTime() - time) / 1000);
      const minutes = Math.round(diffTime / 60);
      if (diffTime <= 60) {
         return `<1хв`
      } else if (minutes <= 60) {
         return `${minutes}хв`
      } else {
         return `${Math.round(minutes / 60)} год ${minutes % 60} хв`
      }
   }

   const userAnswerPoint = () => {
      if (maxPointTest || !userAnswers) return
      let maxPoint = 0
      let userPoint = 0
      test.map(item => {
         userPoint += defineTaskPoint(item, userAnswers[item.number_of_task])
         switch (item.task_type) {
            case 'letter5': {
               maxPoint++
               break
            }
            case 'letter4': {
               maxPoint++
               break
            }
            case 'letters3': {
               maxPoint += 3
               break
            }
            case 'letters': {
               maxPoint += 4
               break
            }
            case 'range1': {
               maxPoint += 2
               break
            }
            case 'range2': {
               maxPoint += 2
               break
            }
            case 'range3': {
               maxPoint += 3
               break
            }
         }
      })
      setMaxPoint(maxPoint)
      setUserPoint(userPoint)
   }
   userAnswerPoint()
   const defineRating = () => {
      if (resultTable?.id) {
         const tables = JSON.parse(resultTable.value)
         if (userPoint >= 0) {
            return tables.value200[userPoint]
         }
      }
      return 0
   }

   useEffect(() => {

      if (isInitUser && !isAsThemeTest && chart) {
         const currMonth = new Date().getMonth()
         const defRating = defineRating()
         const userRatingResult = defRating === WORST_RESULT ? 100 : defRating
         let isSetData = false
         let chartPairUpd = {}
         for (const chartPair of chart[currCategory.id].chart) {
            if (Object.keys(chartPair)[0] === `${currMonth}`) {
               chartPairUpd = { [currMonth]: Math.round((chartPair[currMonth] + userRatingResult) / 2) }
               isSetData = true
            }
         }
         if (!isSetData) {
            chartPairUpd = { [currMonth]: userRatingResult }
         }
         let sendMe = {
            chart: JSON.stringify({
               ...chart,
               [currCategory.id]: {
                  ...chart[currCategory.id],
                  chart: [...chart[currCategory.id].chart.filter((chartPair: ChartPairType) => Object.keys(chartPair)[0] != `${currMonth}`), chartPairUpd]
               }
            })
         }
         dispatch(updateMe(sendMe, false))
      } else if (!isAsThemeTest && !isInitUser) {
         dispatch(appActions.setErrorText('Результат не збережено, для цього потрібно увійти'))
      }
   }, [])
   return (
      <Box sx={{ position: 'relative' }}>
         <Scroll2Top />
         <Fade in={true}>
            <Box >
               <Box sx={{ mb: 5, p: 3, backgroundColor: 'bgmode.main', color: 'fpage.main' }}>
                  <Typography variant="subtitle1" color="inherit" component='div' > Ваш тестовий бал: <strong>{userPoint}</strong> з {maxPointTest} можливих{isAsThemeTest || `, або з ${categoryTagInfo?.maxPoints ? categoryTagInfo?.maxPoints : ''} тестових`}</Typography>
                  {isAsThemeTest || <Typography variant="subtitle1" color="inherit" component='div' >  Ваш рейтинговий бал: <strong>{defineRating()} </strong>з 200 можливих.</Typography>}
                  <Typography variant="subtitle1" color="inherit" component='div' > Витрачено часу: <strong>{getWastedTime()}</strong> з {categoryTagInfo?.maxTime && categoryTagInfo.maxTime} запропонованих</Typography>
               </Box>
               <NavigationTest startTestAgainHandler={startTestAgainHandler} currCategoryUrl={currCategory.slug} />
               <Box sx={{ pt: 3 }}>
                  {displayAllTasks()}
               </Box>
            </Box>
         </Fade>
      </Box>
   )
})

type NavigationTestType = {
   startTestAgainHandler: () => void
   currCategoryUrl: string
}
export const NavigationTest: React.FC<NavigationTestType> = ({ startTestAgainHandler, currCategoryUrl }) => {

   const refNav = useRef<HTMLDivElement>()
   useEffect(() => {
      const handleScroll = () => {
         if (refNav.current && refNav.current.getBoundingClientRect().top < 20) {
            refNav.current.classList.add(styles._stick)
         } else if (refNav.current) {
            refNav.current.classList.remove(styles._stick)
         }
      }
      window.addEventListener('scroll', handleScroll)
      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])
   return <Box>
      <Box ref={refNav} className={`${styles.navigationTest}`}
         sx={{
            backgroundColor: 'bgmode.light',
            borderRadius: 3,
            color: 'fpage.light'
         }}>

         <ButtonNavigation linkUrl={`/${currCategoryUrl}`} Icon={<ListAltIcon />} linkText={
            <div >Усі <strong>тести</strong> з цього предмета</div>
         } />
         <ButtonNavigation linkUrl='' Icon={<LowPriorityIcon />} fn={startTestAgainHandler} linkText={
            <div >Пройти тест ще раз</div>
         } />
         <ButtonNavigation linkUrl={`/${currCategoryUrl}/all`} Icon={<FeaturedPlayListIcon />} linkText={
            <div >Усі <strong>завдання</strong> з цього предмета</div>
         } />
      </Box>
   </Box >
}
type ButtonNavigationType = {
   linkText: JSX.Element
   linkUrl: string
   Icon: JSX.Element
   fn?: () => void
}
const ButtonNavigation: React.FC<ButtonNavigationType> = ({ linkText, linkUrl, Icon, fn }) => {
   return <NavLink className={styles.navigationTest__link} style={{ color: 'inherit' }} to={linkUrl}>
      <Button className={styles.navigationTest__button} variant="outlined"
         sx={{
            color: 'inherit',
            '&:hover': {
               backgroundColor: 'bgmode.dark',
               borderColor: 'fpage.light'
            }
         }}
         startIcon={Icon}
         onClick={() => { if (fn) fn() }}
      >
         <Typography variant="h6" color="inherit" component='div'>
            {linkText}
         </Typography>
      </Button>
   </NavLink>
}