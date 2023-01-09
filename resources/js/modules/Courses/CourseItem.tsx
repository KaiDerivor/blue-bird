import React, { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import { CourseItemHeader } from './CourseItemHeader'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getCategoryTagList, getIsDarkMode, getResultTables, getTags, getTest, getThemesList } from '../../redux/appSelector'
import { CategoryType, getCategoriesInit } from '../../redux/catReducer'
import { detectCategory, detectTag, detectTheme } from '../utils/detectCategory'
import { getTestInit, TaskType } from '../../redux/taskReducer'
import { ResultOfTest } from './ResultOfTest'
//@ts-ignore
import styles from './style.module.scss'
import { getTagsInit } from '../../redux/tagReducer'
import { TaskComponent } from './Task'
import { ButtonsActionSecond } from './ButtonsActionSecond'
import { ButtonTask } from './ButtonTask'
import { appActions } from '../../redux/appReducer'
import { getThemesInit } from '../../redux/themeReducer'

const CourseItem = React.memo(() => {

   const params = useParams();
   const dispatch: any = useDispatch()
   const scrollAnchor = useRef<HTMLDivElement>();

   let rangeRef = useRef(null);
   const categories: Array<CategoryType> = useSelector(getCategories)
   const tags = useSelector(getTags)
   const test: Array<TaskType> = useSelector(getTest)
   const isDarkMode = useSelector(getIsDarkMode)
   const themes = useSelector(getThemesList)

   const [currCategory, setCurrCategory] = useState(detectCategory(categories, params))
   const [currTag, setCurrTag] = useState(detectTag(tags, { tag: params.id }))
   const [currTask, setCurrTask] = useState({} as TaskType)
   const [taskNumber, setTaskNumber] = useState(1)
   const [userAnswers, setUserAnswers] = useState({})
   const [time, setTime] = useState(new Date().getTime())
   const [isEndTest, setIsEndTest] = useState(false) //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   const [isOpenSolution, setIsOpenSolution] = useState(true)
   const [isAsThemeTest, setisAsThemeTest] = useState(false)
   const [isRequestTest, setisRequestTest] = useState(false)
   const [isSendedRequestTest, setIsSendedRequest] = useState(false)
   useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
      dispatch(appActions.toggleFetchingOn())
      let idTime = setTimeout(() => { dispatch(appActions.toggleFetchingOff()) }, 1000)

      if (categories.length <= 0) {
         dispatch(getCategoriesInit())
      }
      if (tags.length <= 0) {
         dispatch(getTagsInit())
      }
      return () => {
         clearTimeout(idTime)
      };

   }, [])

   useEffect(() => {
      if (tags.length > 0) {
         for (const tag of tags) {
            if (tag.slug === params.id) {
               setCurrTag(tag)
            }
         }
      }
      setisRequestTest(true)
   }, [tags])

   useEffect(() => {
      if (categories.length > 0) {
         for (const category of categories) {
            if (category.slug === params.category) {
               setCurrCategory(category)
            }
         }
      }
   }, [categories])

   useEffect(() => {   //init test
      if (isRequestTest && !isSendedRequestTest) {
         if (currCategory?.id && currTag?.id) {
            dispatch(getTestInit(currCategory.id, currTag.id, ''))
         } else if (themes.length === 0 && currCategory?.id) {
            dispatch(getThemesInit(`${currCategory.id}`))
         } else if (currCategory?.id) {
            dispatch(getTestInit(currCategory.id, '', detectTheme(themes, params.id).id))
            setisAsThemeTest(true)
         }
      }
   }, [isRequestTest, currTag?.id])

   useEffect(() => {
      setIsOpenSolution(false)
   }, [taskNumber])

   const allTasksNumbers = () => { //get all numbers of test
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
         <Box ref={scrollAnchor} />
         <CourseItemHeader title={currCategory.title} subtitle={currCategory.description} />
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
               isAsThemeTest={isAsThemeTest}
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