import React, { createRef, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import { getResultTableInit, TaskType } from '../../redux/taskReducer';
import { AnswerField } from './AnswerField';
import { URL_STORAGE } from '../../redux/appReducer';
import { CategoryRecordType, getCategoryTagsInit } from '../../redux/catReducer';
import { TagRecordType } from '../../redux/tagReducer';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from "react-redux"
import { getCategoryTagList, getResultTables, getTableOfResult } from '../../redux/appSelector';
import Typography from '@mui/material/Typography'
import { TaskComponent } from './Task';
import { Button } from '@mui/material';
import { tab } from '@testing-library/user-event/dist/types/setup/directApi';
import { defineTaskPoint } from '../utils/defineTaskPoint';

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

            //@ts-ignore
            // dispatch(getResultTableInit(`${currCategory.id}`, `${currTag.id}`))
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
               <Box>
                  Усі завдання з цього предмета
                  <Button variant='outlined' onClick={() => { startTestAgainHandler() }} >Again?</Button>
               </Box>
               <Box>
                  {displayAllTasks()}
               </Box>
            </Box>
         </Fade>
      </>
   )
}