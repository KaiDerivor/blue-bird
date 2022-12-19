import React, { createRef, Ref, useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import { CourseItemHeader } from '../common/CourseItemHeader'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getIsDarkMode, getTest } from '../../redux/appSelector'
import { CategoryType, getCategoriesInit, getCategoryTagsInit } from '../../redux/catReducer'
import { detectCategory } from '../utils/detectCategory'
import { getResultTableInit, getTestInit, TaskType } from '../../redux/taskReducer'
import { NavigationTest, ResultOfTest } from './ResultOfTest'
//@ts-ignore
import styles from './style.module.scss'
import { TagRecordType } from '../../redux/tagReducer'
import { TaskComponent } from './Task'
import { ButtonsActionSecond } from './ButtonsActionSecond'
import { ButtonTask } from './ButtonTask'

const CourseItem = React.memo(() => {

   const params = useParams();
   const dispatch: any = useDispatch()

   let rangeRef = useRef(null);
   const categories: Array<CategoryType> = useSelector(getCategories)
   const test: Array<TaskType> = useSelector(getTest)
   const isDarkMode = useSelector(getIsDarkMode)

   const [currCategory, setCurrCategory] = useState(detectCategory(categories, params))
   const [currTag, setCurrTag] = useState({} as TagRecordType)
   const [currTask, setCurrTask] = useState<TaskType>({} as TaskType)
   const [taskNumber, setTaskNumber] = useState(1)
   // const [userAnswers, setUserAnswers] = useState({})
   const [userAnswers, setUserAnswers] = useState({ 1: 'Д', 2: 'Г', 3: 'А', 4: 'Д', 5: 'А', 6: 'В', 7: 'Г', 8: 'Б', 9: 'Д', 10: 'А', 11: 'Б', 12: 'Г', 13: 'А', 14: 'Г', 15: 'Д', 16: 'Б', 17: 'Д', 18: 'Б', 19: 'Б', 20: 'Г', 21: 'ВБД', 22: 'БВД', 23: 'ГБД', 24: 'АВБ', 25: '2,30', 26: '1,2', 27: '33,1', 28: '34', 29: '2', 30: '2', 31: '3', 32: '4' })
   const [time, setTime] = useState(new Date().getTime() - 1000 * 60 * 60 - 60000)
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
   useEffect(() => {
      if (currCategory.id !== undefined && currTag.id !== undefined) {
         dispatch(getResultTableInit(`${currCategory.id}`, `${currTag.id}`))
         dispatch(getCategoryTagsInit(`${currCategory.id}`, `${currTag.id}`))
      }

   }, [currCategory, currTag])
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
   const scroll2ButtonNumberTask = (button: HTMLButtonElement) => {
      if (rangeRef?.current) {
         const div = rangeRef.current as HTMLDivElement
         div.scrollBy(button.getBoundingClientRect().left - 100, 0)
      }
   }
   const nextTaskHandler = () => {

      let currNumberOfElement = 0;
      const numbers = allTasksNumbers();
      if (numbers[numbers.indexOf(taskNumber) + 1]) {
         if (userAnswers[numbers[numbers.indexOf(taskNumber) + 1]]) {
            for (let i = taskNumber; i < numbers.length; i++) {
               if (!userAnswers[numbers[i]]) {
                  setTaskNumber(numbers[i]);
                  currNumberOfElement = numbers[i]
                  break
               }
            }
         } else {
            currNumberOfElement = numbers[numbers.indexOf(taskNumber) + 1]
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
                     currNumberOfElement = element.number_of_task
                     break;
                  }
            }
         }
         if (!isSetNumber) {
            setTaskNumber(numbers[numbers.length - 1]);
         }
      }
      if (rangeRef?.current && rangeRef.current)//@ts-ignore
         scroll2ButtonNumberTask(rangeRef.current.children[currNumberOfElement - 1])
   }
   const clickNumberTaskHandler = (value: HTMLButtonElement) => {
      const numberTask = value.getAttribute('data-number-task');
      if (numberTask) {
         setTaskNumber(+numberTask)
      }
   }
   const renderTaskButtons = () => {
      let buttons = [] as Array<JSX.Element>;
      for (const task of test) {
         buttons.push(
            <Button variant="outlined"
               key={task.number_of_task}
               data-number-task={task.number_of_task}
               onClick={(el) => clickNumberTaskHandler(el.target as HTMLButtonElement)}
               className={styles.button2Task}
               sx={{
                  borderColor: task.number_of_task === taskNumber ? 'fpage.main' : 'bgmode.main',
                  backgroundColor: task.number_of_task === taskNumber ? 'bgmode.dark' : 'bgmode.main',
                  color: "fpage.light", m: 0.2,
                  '&:hover': { backgroundColor: 'bgmode.main', borderColor: 'red' }
               }}
            > {task.number_of_task}</Button >
         )
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
      //@ts-ignore
      setUserAnswers({})
      setIsEndTest(false)
      setTime(new Date().getTime() - 1000 * 60 * 60 - 60000)
   }
   return (

      <Box>
         <CourseItemHeader title={`${currCategory.title}`} subtitle={`${currCategory.description}`} />
         <Box className={`${styles.wrapperButtons} ${isDarkMode ? styles.wrapperButtons__blurSideDark : styles.wrapperButtons__blurSideLight}`} >
            <Box ref={rangeRef} className={styles.wrapperButtons__range} sx={{ mb: 3 }}>
               {renderTaskButtons()}
            </Box>
         </Box>
         {isEndTest
            ? <ResultOfTest
               test={test} time={time}
               userAnswers={userAnswers}
               currTag={currTag}
               currCategory={currCategory}
               startTestAgainHandler={startTestAgainHandler} />
            : <Box>
               <Box sx={{ margin: '0 auto' }}>
                  {renderTask()}
               </Box>
               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ButtonTask title='Наступне завдання' fn={nextTaskHandler} />
                  <ButtonTask title='Завершити тест' fn={() => setIsEndTest(true)} />
               </Box>
               <ButtonsActionSecond setIsOpenSolution={setIsOpenSolution} isOpenSolution={isOpenSolution} currTask={currTask} />
            </Box>
         }
      </Box>
   )
})

export default CourseItem