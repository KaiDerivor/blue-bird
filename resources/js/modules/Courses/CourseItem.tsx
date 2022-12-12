import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import { CourseItemHeader } from '../common/CourseItemHeader'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getTest } from '../../redux/appSelector'
import { CategoryRecordType, CategoryType, getCategoriesInit } from '../../redux/catReducer'
import { AppDispatch } from '../../redux/store'
import { detectCategory } from '../utils/detectCategory'
import { getTestInit, lettersOfAnswers, TaskRecordType, TaskType } from '../../redux/taskReducer'
import { URL_STORAGE } from '../../redux/appReducer'
import { AnswerField } from './AnswerField'
import { Collapse, Typography } from '@mui/material'
import { ResultOfTest } from './ResultOfTest'
//@ts-ignore
import styles from './style.module.scss'
import { TagRecordType } from '../../redux/tagReducer'
import { TaskComponent } from './Task'
import { ButtonsActionSecond } from './ButtonsActionSecond'
import { ButtonTask } from './ButtonTask'

const buttonsAction = {
   backgroundColor: 'bgmode.main', color: 'fpage.main', borderColor: 'bgmode.main'
}

export const CourseItem = () => {

   const params = useParams();
   const dispatch: AppDispatch = useDispatch()

   const categories: Array<CategoryType> = useSelector(getCategories)
   const test: Array<TaskType> = useSelector(getTest)

   const [currCategory, setCurrCategory] = useState(detectCategory(categories, params))
   const [currTag, setCurrTag] = useState({} as TagRecordType)
   const [currTask, setCurrTask] = useState<TaskType>({} as TaskType)
   const [taskNumber, setTaskNumber] = useState(1)
   const [userAnswers, setUserAnswers] = useState({
      "1": "А",
      "2": "Г",
      "6": "ВАДА",
      "11": "БГВБ",
      "13": "13.44",
      "15": "234",
      "21": "741",
      "25": '2,30'
   })
   const [time, setTime] = useState(new Date().getTime()-1000*60*60-60000)
   const [isEndTest, setIsEndTest] = useState(false) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   const [isOpenSolution, setIsOpenSolution] = useState(true)


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
            if (typeof tag === 'number') {
               return;
            }
            if (tag.textUrl === params.id) {
               //@ts-ignore
               dispatch(getTestInit(currCategory.id, tag.id))
               setCurrTag(tag)
            }
         })
      }
   }, [currCategory])

   useEffect(() => {
      setIsOpenSolution(false)
   }, [taskNumber])

   const allTasksNumbers = () => {
      let numbers: Array<number> = [];
      for (const key in test) {
         if (Object.prototype.hasOwnProperty.call(test, key)) {
            const element = test[key];
            if (element.number_of_task)
               numbers.push(element.number_of_task)  // choose first task as answer default
         }
      }
      return numbers
   }
   const nextTaskHandler = () => {
      const numbers = allTasksNumbers();
      if (numbers[numbers.indexOf(taskNumber) + 1]) {
         if (userAnswers[numbers[numbers.indexOf(taskNumber) + 1]]) {
            for (let i = numbers.indexOf(taskNumber); i < numbers.length; i++) {
               if (!userAnswers[numbers[i + 1]]) {
                  setTaskNumber(numbers[i]);
                  return;
               }
            }
         } else {
            setTaskNumber(numbers[numbers.indexOf(taskNumber) + 1]);
         }
      } else {
         let isSetNumber = false;

         for (const key in test) {

            if (Object.prototype.hasOwnProperty.call(test, key)) {
               const element = test[key];
               if (element.number_of_task)
                  if (!userAnswers[element.number_of_task] || userAnswers[element.number_of_task] === ',,,') {
                     setTaskNumber(element.number_of_task)
                     isSetNumber = true;
                     break;
                  }
            }
         }
         if (!isSetNumber) {
            setTaskNumber(numbers[numbers.length - 1]);
         }
      }
   }
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
            className={styles.button2Task}
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
   const renderTask = () => {
      let taskAnswers = [] as Array<string>
      let taskQuestion = ''

      for (const task of test) {
         if (task.number_of_task === taskNumber) {
            if (currTask.number_of_task !== task.number_of_task)
               setCurrTask(task as TaskType)
            if (task.test_qa) {
               const taskQA = JSON.parse(task.test_qa)
               taskAnswers = taskQA.taskAnswers
               taskQuestion = taskQA.taskQuestion
            }
            return (
               <TaskComponent task={task} currCategory={currCategory} currTag={currTag}
                  setUserAnswers={setUserAnswers} userAnswers={userAnswers} />
            )
         }
      }

   }
   const startTestAgainHandler = () => {
      setUserAnswers({})
      setIsEndTest(false)
      setTime(new Date().getTime()-1000*60*60-60000)
   }
   if (isEndTest) {
      return <ResultOfTest
         test={test} time={time}
         userAnswers={userAnswers}
         currTag={currTag}
         currCategory={currCategory}
         startTestAgainHandler={startTestAgainHandler} />
   }
   return (

      <Box>
         <CourseItemHeader title={`${currCategory.title}`} subtitle={`${currCategory.description}`} />
         <Box className={styles.noScrollBar} sx={{ overflowX: 'scroll', width: '80vw', maxHeight: '100px', overflowY: 'hidden', margin: '0 auto', mb: 3, pr: 1, pl: 1 }}>
            <Box sx={{ width: '70%', display: 'flex' }}>
               {renderTaskButtons()}
            </Box>
         </Box>
         <Box sx={{ margin: '0 auto' }}>
            {renderTask()}
         </Box>
         <Box sx={{ pt: 3, display: 'flex', justifyContent: 'space-between' }}>
            <ButtonTask title='Наступне завдання' fn={nextTaskHandler} />
            <ButtonTask title='  Завершити тест' fn={() => setIsEndTest(true)} />
         </Box>
         <ButtonsActionSecond setIsOpenSolution={setIsOpenSolution} isOpenSolution={isOpenSolution} currTask={currTask} />
      </Box>
   )


}

