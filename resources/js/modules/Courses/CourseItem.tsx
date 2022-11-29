import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import { CourseItemHeader } from '../common/CourseItemHeader'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getTest } from '../../redux/appSelector'
import { CategoryRecordType, getCategoriesInit } from '../../redux/catReducer'
import { AppDispatch } from '../../redux/store'
import { detectCategory } from '../utils/detectCategory'
import { ConstructionOutlined } from '@mui/icons-material'
import { getTestInit, TaskRecordType } from '../../redux/taskReducer'
import { URL_STORAGE } from '../../redux/appReducer'
import { AnswerField } from './AnwerField'

export const CourseItem = () => {

   const params = useParams();
   const dispatch: AppDispatch = useDispatch()

   const categories: Array<CategoryRecordType> = useSelector(getCategories)
   const test: Array<TaskRecordType> = useSelector(getTest)

   const [currCategory, setCurrCategory] = useState(detectCategory(categories, params))
   const [currTagUrl, setCurrTagUrl] = useState('')
   const [taskNumber, setTaskNumber] = useState(1)
   const [userAnswers, setUserAnswers] = useState({})

   useEffect(() => {
      return () => {
         if (categories.length <= 0) {
            //@ts-ignore
            dispatch(getCategoriesInit())
         }
      };
   }, [])
   useEffect(() => {
      if (categories.length > 0)
         setCurrCategory(detectCategory(categories, params))
   }, [categories])

   useEffect(() => {
      if (currCategory.id !== 0) {
         currCategory.tags?.map(tag => {
            if(typeof tag==='number'){
               return;
            }
            if (tag.textUrl === params.id) {
               //@ts-ignore
               dispatch(getTestInit(currCategory.id, tag.id))
               setCurrTagUrl(tag.textUrl)
            }
         })
      }
   }, [currCategory])

   const clickNumberTaskHandler = (value: HTMLButtonElement) => {
      const numberTask = value.getAttribute('data-number-task');
      if (numberTask) {
         setTaskNumber(+numberTask)
      }
   }
   const renderTaskButtons = () => {
      let buttons: Array<JSX.Element> = [];

      for (const task of test) {
         buttons.push(<Button variant="outlined"
            key={task.number_of_task}
            data-number-task={task.number_of_task}
            onClick={(el) => clickNumberTaskHandler(el.target as HTMLButtonElement)}
            sx={{
               borderColor: task.number_of_task === taskNumber ? 'fpage.main' : 'bgmode.main',
               backgroundColor: task.number_of_task === taskNumber ? 'bgmode.dark' : 'bgmode.main',
               color: task.number_of_task === taskNumber ? "fpage.light" : 'fpage.dark', m: 0.2,
               '&:hover': { backgroundColor: 'bgmode.main', borderColor: 'red' }
            }
            }
         > {task.number_of_task}</Button >)
      }
      return buttons
   }
   const showTask = () => {
      for (const task of test) {
         if (task.number_of_task === taskNumber) {
          
            return (
               <>
               <div>
                  <img src={`${URL_STORAGE}${task.task}`} alt={`${currCategory.textUrl}-${currTagUrl}-${task.number_of_task}`} />
               </div>
                  <div>{task.number_of_task}</div>
                  <AnswerField 
                  task={task} 
                  setUserAnswers={setUserAnswers} 
                  userAnswers={userAnswers}/>
               </>
            )
         }
      }

   }
   return (
      <Box>
         <CourseItemHeader title={`${currCategory.title}`} subtitle={`${currCategory.description}`} />
         <Box sx={{ mb: 3 }}>
            {renderTaskButtons()}
         </Box>
         <Box sx={{ margin: '0 auto' }}>
            {showTask()}
         </Box>
      </Box>
   )
}