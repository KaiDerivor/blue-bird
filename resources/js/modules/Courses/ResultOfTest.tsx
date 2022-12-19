import React, { createRef, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import { getResultTableInit, TaskType } from '../../redux/taskReducer';
//@ts-ignore
import styles from './style.module.scss'
import { CategoryRecordType, getCategoryTagsInit } from '../../redux/catReducer';
import { TagRecordType } from '../../redux/tagReducer';
import { useDispatch, useSelector } from "react-redux"
import { getCategoryTagList, getResultTables, getTableOfResult } from '../../redux/appSelector';
import Typography from '@mui/material/Typography'
import { TaskComponent } from './Task';
import { Button } from '@mui/material';
import { defineTaskPoint } from '../utils/defineTaskPoint';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { NavLink } from 'react-router-dom';
import LowPriorityIcon from '@mui/icons-material/LowPriority';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';

type ResultOfTestType = {
   currCategory: CategoryRecordType
   currTag: TagRecordType
   test: Array<TaskType>
   userAnswers: any
   startTestAgainHandler: () => void
   time: number
}
export const ResultOfTest: React.FC<ResultOfTestType> = ({ currCategory, test, userAnswers, currTag, startTestAgainHandler, time }) => {
   const dispatch: any = useDispatch()
   const dummy = useRef();
   const resultTable = useSelector(getResultTables)[0]
   const categoryTagInfo = useSelector(getCategoryTagList)[0]
   const [maxPointTest, setMaxPoint] = useState(0)
   const [userPoint, setUserPoint] = useState(0)

   useEffect(() => {
      return () => {
         if (currCategory.id !== undefined && currTag.id !== undefined) {
            dispatch(getCategoryTagsInit(`${currCategory.id}`, `${currTag.id}`))
         }
      }
   }, [currCategory, currTag])

   useEffect(() => {
      if (dummy.current)//@ts-ignore
         dummy.current.scrollIntoView({ behavior: 'smooth' });
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
         if (userPoint) {
            return tables.value200[userPoint]
         }
      }
      return 0
   }

   return (
      <>
         <Box ref={dummy} />
         <Fade in={true}>
            <Box >
               <Box sx={{ mb: 5, p: 3, backgroundColor: 'bgmode.main', color: 'fpage.main' }}>
                  <Typography variant="subtitle1" color="inherit"> Ваш тестовий бал: <strong>{userPoint}</strong> з {maxPointTest} можливих, або з {categoryTagInfo?.maxPoints ? categoryTagInfo?.maxPoints : ''} тестових</Typography>
                  <Typography variant="subtitle1" color="inherit">  Ваш рейтинговий бал: <strong>{defineRating()} </strong>з 200 можливих.</Typography>
                  <Typography variant="subtitle1" color="inherit"> Витрачено часу: <strong>{getWastedTime()}</strong> з {categoryTagInfo?.maxTime && categoryTagInfo.maxTime} запропонованих</Typography>
               </Box>
               <NavigationTest startTestAgainHandler={startTestAgainHandler} />
               <Box sx={{pt:3}}>
                  {displayAllTasks()}
               </Box>
            </Box>
         </Fade>
      </>
   )
}

type NavigationTestType = {
   startTestAgainHandler: () => void
}
export const NavigationTest: React.FC<NavigationTestType> = ({ startTestAgainHandler }) => {

   const refNav = useRef<HTMLDivElement>(null)
   useEffect(() => {
      const handleScroll = () => {
         if (refNav.current && refNav.current.getBoundingClientRect().top <20) {
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
   return <Box ref={refNav} className={`${styles.navigationTest}`} data-is-sticky='false'
      sx={{
         backgroundColor: 'bgmode.light',
         borderRadius: 3,
         color: 'fpage.light'
      }}>
      <ButtonNavigation linkUrl='/' Icon={<ListAltIcon />} linkText={
         <Typography variant="h6" color="inherit">Усі <strong>завдання</strong> з цього предмета</Typography>
      } />
      <ButtonNavigation linkUrl='/' Icon={<LowPriorityIcon />} linkText={
         <Typography variant="h6" color="inherit">Пройти тест ще раз</Typography>
      } />
      <ButtonNavigation linkUrl='/' Icon={<FeaturedPlayListIcon />} linkText={
         <Typography variant="h6" color="inherit">Усі <strong>завдання</strong> з цього предмета</Typography>
      } />
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
         <Typography variant="h6" color="inherit">
            {linkText}
         </Typography>
      </Button>
   </NavLink>
}