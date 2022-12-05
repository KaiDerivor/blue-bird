import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import { getResultTable, TaskType } from '../../redux/taskReducer';
import { AnswerField } from './AnswerField';
import { URL_STORAGE } from '../../redux/appReducer';
import { CategoryRecordType } from '../../redux/catReducer';
import { TagRecordType } from '../../redux/tagReducer';
import { api } from '../../api/api';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from "react-redux"
import { getTableOfResult } from '../../redux/appSelector';

type ResultOfTestType = {
   currCategory: CategoryRecordType
   currTag: TagRecordType
   test: Array<TaskType>
   userAnswers: any
}
export const ResultOfTest: React.FC<ResultOfTestType> = ({ currCategory, test, userAnswers, currTag }) => {
   const dispatch: AppDispatch = useDispatch()

   const resultTable = useSelector(getTableOfResult)
   useEffect(() => {
      if (currCategory.id !== undefined && currTag.id !== undefined) {
         //@ts-ignore
         dispatch(getResultTable(`${currCategory.id}`, `${currTag.id}`))
      }
   }, [currCategory, currTag])

   const displayAllTasks = () => {
      let tasks = [] as Array<JSX.Element>
      for (const task of test) {
         tasks.push(<Box key={task.id}>
            <div>
               <img src={`${URL_STORAGE}${task.task}`} alt={`${currCategory.textUrl}-${currTag.textUrl}-${task.number_of_task}`} />
            </div>
            <div>{task.number_of_task}</div>
            <AnswerField
               task={task}
               userAnswers={userAnswers}
               isAsAnswer
            />
         </Box>
         )

      }
      return tasks;
   }
   console.log(resultTable)
   return (
      <Fade in={true}>
         <Box >
            <Box sx={{ mb: 5, p: 2, backgroundColor: 'bgmode.main' }}>
               Ваш тестовий бал: 0 з 62 можливих.
               Ваш рейтинговий бал: не склав з 200 можливих.
               Витрачено часу: 1 хв. з 180 запропонованих
            </Box>
            <Box>
               Усі завдання з цього предмета
            </Box>
            <Box>
               {displayAllTasks()}
            </Box>
         </Box>
      </Fade>
   )
}