import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import { getResultTableInit, TaskType } from '../../redux/taskReducer';
import { AnswerField } from './AnswerField';
import { URL_STORAGE } from '../../redux/appReducer';
import { CategoryRecordType } from '../../redux/catReducer';
import { TagRecordType } from '../../redux/tagReducer';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from "react-redux"
import { getTableOfResult } from '../../redux/appSelector';
import Typography from '@mui/material/Typography'
import { TaskComponent } from './Task';
import { Button } from '@mui/material';

type ResultOfTestType = {
   currCategory: CategoryRecordType
   currTag: TagRecordType
   test: Array<TaskType>
   userAnswers: any
   startTestAgainHandler: () => void
   time: number
}
export const ResultOfTest: React.FC<ResultOfTestType> = ({ currCategory, test, userAnswers, currTag, startTestAgainHandler, time }) => {
   const dispatch: AppDispatch = useDispatch()
   const resultTable = useSelector(getTableOfResult)
   console.log(resultTable)
   useEffect(() => {
      if (currCategory.id !== undefined && currTag.id !== undefined) {
         //@ts-ignore
         dispatch(getResultTableInit(`${currCategory.id}`, `${currTag.id}`))
      }
   }, [currCategory, currTag])

   const displayAllTasks = () => {
      let tasks = [] as Array<JSX.Element>
      for (const task of test) {
         tasks.push(
            <Box key={task.number_of_task}>
               <TaskComponent task={task} currCategory={currCategory} currTag={currTag}
                  userAnswers={userAnswers} isAsAnswer />
            </Box>
         )
      }
      return tasks;
   }
   const getWastedTime = () => {
      console.log(new Date(time))
      const diffTime = Math.round((new Date().getTime() - time) / 1000);
      const minutes=Math.round(diffTime/60);
      console.log(diffTime)
      if(diffTime<=60){
         return `<1хв`
      }else if(minutes<=60){
         return `${minutes}хв`
      }else{
         return `${Math.round(minutes/60)} год ${minutes%60} хв`
      }
      
      return diffTime;
   }
   return (
      <Fade in={true}>
         <Box >
            <Box sx={{ mb: 5, p: 3, backgroundColor: 'bgmode.main', color: 'fpage.main' }}>
               <Typography variant="subtitle1" color="inherit"> Ваш тестовий бал: <strong>0</strong> з 62 можливих.</Typography>
               <Typography variant="subtitle1" color="inherit">  Ваш рейтинговий бал: <strong>не склав </strong>з 200 можливих.</Typography>
               <Typography variant="subtitle1" color="inherit"> Витрачено часу: <strong>{getWastedTime()}</strong> з 180 запропонованих</Typography>
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
   )
}