import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import { getLikedTasks, getSavedTasks } from '../../redux/appSelector'
import { initSavedTasks, lettersOfAnswers, TaskSavedType } from '../../redux/taskReducer'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { TaskComponent } from '../Courses/Task'
//@ts-ignore
import styles from './../Courses/style.module.scss'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { URL_STORAGE } from '../../redux/appReducer'
import { ButtonsActionSecond } from '../Courses/ButtonsActionSecond'
import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const TaskOne = () => {

   const id = useParams().id
   if (!id || isNaN(+id)) {
      return <Navigate to='/404' />
   }
   const navigate = useNavigate()
   const dispatch: any = useDispatch()
   const taskId = useParams().id ? useParams().id : ''

   const savedTasks = useSelector(getSavedTasks)
   const likedTasks = useSelector(getLikedTasks)

   const [currTask, setCurrTask] = useState({} as TaskSavedType)
   const [isOpenSolution, setIsOpenSolution] = useState(false)

   useEffect(() => {
      savedTasks.length === 0 && likedTasks.length > 0 &&
         !currTask?.id || likedTasks.length != savedTasks.length && dispatch(initSavedTasks(likedTasks))
   }, [likedTasks])

   let taskAnswers = [] as Array<string>
   let taskQuestion = ''
   useEffect(() => {
      if (!taskId) return;
      if (savedTasks.length > 0) {
         savedTasks.forEach(task => {
            if (`${task.id}` === taskId) {
               setCurrTask(task);

               if (task.test_qa) {
                  const taskQA = JSON.parse(task.test_qa)
                  taskAnswers = taskQA.taskAnswers
                  taskQuestion = taskQA.taskQuestion
               }
               return;
            }
         });
      }

   }, [savedTasks])

   console.log(currTask)
   return (
      <Box>
         <Box sx={{ pr: 3, pl: 3, color: 'fpage.light' }}>
            <Box sx={{ mb: 3 }}>

               <Button variant="text" sx={{ color: 'inherit' }}
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate(-1)}
               >Назад</Button>
            </Box>
            <Box sx={{ mb: 2 }}>
               <Typography variant="h6" color="inherit">{currTask?.category?.title ? currTask?.category?.title : ''}</Typography>
               <Typography variant="h6" color="inherit">{currTask?.tag?.title ? currTask?.tag?.title : ''}</Typography>
            </Box>
            <Box sx={{ color: 'fpage.main', }} key={currTask.id}>
               <Box sx={{ mb: 3 }}>
                  <Divider textAlign="right">
                     <Typography variant="subtitle1" color="inherit" className={styles.markNumberTask}
                        sx={{
                           border: '2px solid',
                           borderColor: 'bgmode.dark',
                           backgroundColor: 'bgmode.main',
                           pr: 2,
                           pl: 2
                        }}
                     > Завдання {currTask.numberOfTask}</Typography>

                  </Divider>

               </Box>
               <Box sx={{ pb: 3 }}>
                  <Typography variant="body1" color="inherit">{taskQuestion}</Typography>
               </Box>
               {currTask.task &&
                  <Box sx={{ pb: 3 }}>
                     <img src={`${URL_STORAGE}${currTask.task}`} alt={`saved-${currTask.numberOfTask}`} />
                  </Box>
               }
               <Box sx={{}}>
                  {
                     taskAnswers.length > 0 && taskAnswers.map((answerVariant, index) => {
                        if (answerVariant)
                           return <Typography key={index} variant="body1" color="inherit">
                              {lettersOfAnswers[index]} {answerVariant}
                           </Typography>
                     })
                  }
               </Box>
               <Box>Правильна відповідь: {currTask.answer}</Box>
               <ButtonsActionSecond
                  setIsOpenSolution={setIsOpenSolution}
                  isOpenSolution={isOpenSolution}
                  currTask={currTask}
               />
            </Box >
         </Box>
      </Box >
   )
}
export default TaskOne

