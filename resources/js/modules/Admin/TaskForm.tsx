import React, { useState, useEffect } from 'react';
//@ts-ignore
import styles from './style.module.scss';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getErrorText, getRulesList, getTags, getTaskFilter, getThemesList } from '../../redux/appSelector';
import { AppDispatch } from '../../redux/store';
import { ButtonSubmit } from '../Auth/ButtonSubmit';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import { TaskRecordType } from '../../redux/taskReducer';
import { URL_STORAGE } from '../../redux/appReducer';
import { getRulesInit } from '../../redux/ruleReducer';
import { getThemesInit } from '../../redux/themeReducer';

type TaskFormType = {
   handleConfirm: (arg1: TaskRecordType) => void
   task: TaskRecordType
}
export const TaskForm: React.FC<TaskFormType> = ({ handleConfirm, task }) => {
   const dispatch: any = useDispatch();

   const errorText = useSelector(getErrorText)
   const categories = useSelector(getCategories)
   const tagsList = useSelector(getTags)
   const rules = useSelector(getRulesList)
   const themes = useSelector(getThemesList)
   let [filterTag, filterCategory] = useSelector(getTaskFilter)
   const [isSubmiting, setIsSubmiting] = useState(false)
   const [currCategoryId, setCurrCategoryId] = useState<string | null>(() => {
      if (task?.category_id) {
         return task.category_id
      } else {
         return null
      }
   })

   useEffect(() => {
      return () => {
         if (currCategoryId) {
            dispatch(getRulesInit(`${currCategoryId}`))
            dispatch(getThemesInit(`${currCategoryId}`))
         }
      };
   }, [currCategoryId])

   const [number_of_task, setNumberTask] = useState(() => {
      if (task?.number_of_task) {
         return task.number_of_task
      } else {
         return 1;
      }
   })

   const [taskImg, setTaskImg] = useState<any>(null)
   const [error, setError] = useState('')
   useEffect(() => {
      if (errorText.length <= 1) {
         setIsSubmiting(false)
      }
   }, [errorText])
   if (!filterTag) {
      filterTag = '0';
   }
   if (!filterCategory) {
      filterCategory = '0'
   }
   return (
      <div>
         <Formik
            initialValues={{
               answer: task?.answer ? task.answer : '',
               content: task?.content ? task.content : '',
               task: task?.task ? task.task : '',
               number_of_task: task?.number_of_task ? task.number_of_task : '',
               category_id: task?.category_id ? task.category_id : `${filterCategory}`,
               tag_id: task?.tag_id ? task.tag_id : `${filterTag}`,
               task_type: task?.task_type ? task.task_type : 'letter5',
               taskAnswers: task?.test_qa ? JSON.parse(task.test_qa).taskAnswers.join('##') : '',
               taskQuestion: task?.test_qa ? JSON.parse(task.test_qa).taskQuestion : '',
               theme_id: task?.theme ? task.theme.id : '',
               rule_id: task?.rule ? task.rule.id : '',

            }}
            onSubmit={(values) => {
               //@ts-ignore
               let formData = { ...values, task: taskImg, number_of_task }


               if (!formData.answer) {
                  setError('Fill answer')
                  return;
               }
               if (!formData.category_id) {
                  setError('Choose category')
                  return;
               }
               if (!formData.tag_id) {
                  setError('Choose tag')
                  return;
               }
               if (!formData.task_type) {
                  setError('Choose task_type')
                  return;
               }
               //@ts-ignore
               formData.test_qa = JSON.stringify({
                  taskQuestion: formData.taskQuestion,
                  taskAnswers: formData.taskAnswers.split('##')
               })
               delete formData.taskQuestion
               delete formData.taskAnswers

               // console.log(formData)
               handleConfirm(formData)
            }}
         >
            <Form className={styles.forms}>

               <Box className={styles.wrapperField}>
                  {task?.task && <img src={`${URL_STORAGE}${task?.task}`} />}
               </Box>
               <Box className={styles.wrapperField}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                     <div>

                        <Button variant="contained" component="label">
                           Upload
                           <input hidden multiple type="file" onChange={(el) => {
                              //@ts-ignore
                              setTaskImg(el.target.files[0])
                           }} />
                        </Button>
                        <IconButton color="primary" aria-label="upload picture" component="label">

                           <input hidden accept="image/*" type="file" onChange={(el) => {
                              //@ts-ignore
                              setTaskImg(el.target.files[0])
                           }}

                           />
                           <PhotoCamera />
                        </IconButton>{taskImg?.name}
                     </div>

                  </Stack>
               </Box>
               <Box className={styles.wrapperField}>
                  <Field as="textarea" rows='10' name="taskQuestion" className={styles.inputField}
                     placeholder="Task" autoComplete='' />
               </Box>
               <Box className={styles.wrapperField}>
                  <Field as="textarea" rows='10' name="taskAnswers" className={styles.inputField}
                     placeholder="Separete by ##" autoComplete='' />
               </Box>
               <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>

                  <Box className={styles.wrapperField}>
                     <Typography variant="subtitle2" color="fpage.main">Answer must be separeted by ,</Typography>
                     <Field as="textarea" rows='10' name="answer" className={styles.inputField}
                        placeholder="answer" autoComplete='' />
                     <ErrorMessage name="answer" component="div" />
                  </Box>
                  <Box className={styles.wrapperField}>
                     <Field as="textarea" rows='10' name="content" className={styles.inputField}
                        placeholder="content" autoComplete='' />
                     <ErrorMessage name="content" component="div" />
                  </Box>
               </Box>

               <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>
                  <Box className={styles.wrapperField}>
                     <Field as="select" name="category_id" className={styles.inputField} onChange={(el) => setCurrCategoryId(el.target.value)}>
                        {categories && categories.map(cat => {
                           return (<option key={cat.id} value={cat.id}>{cat.title}</option>)
                        })}
                     </Field>
                  </Box>
                  <Box className={styles.wrapperField}>
                     <Field as="select" name="tag_id" className={styles.inputField}>
                        {tagsList && tagsList.map(tag => {
                           return (<option key={tag.id} value={tag.id}>{tag.title}</option>)
                        })}

                     </Field>
                     <ErrorMessage name="tag_id" component="div" />
                  </Box>
                  <Box className={styles.wrapperField}>
                     <Field as="select" name="task_type" className={styles.inputField}>
                        <option value='letter4'>letter4</option>
                        <option value='letter5'>letter5</option>
                        <option value='letters3'>letters3</option>
                        <option value='letters4'>letters4</option>
                        <option value='range1'>range1</option>
                        <option value='range2'>range2</option>
                        <option value='range3'>range3</option>
                        <option value='default'>default</option>
                     </Field>
                     <ErrorMessage name="task_type" component="div" />
                  </Box>
               </Box>

               <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>
                  <Box className={styles.wrapperField}>
                     <Field as="select" name="theme_id" className={styles.inputField}>
                        {themes && themes.map(theme => {
                           return (<option key={theme.id} value={theme.id}>{theme.title}</option>)
                        })}
                     </Field>
                  </Box>
                  <Box className={styles.wrapperField}>
                     <Field as="select" name="rule_id" className={styles.inputField}>
                        {rules && rules.map(rule => {
                           return (<option key={rule.id} value={rule.id}>{rule.title}</option>)
                        })}

                     </Field>
                  </Box>

               </Box>


               <Box className={styles.wrapperField}>
                  <Field type="number" name="number_of_task" className={styles.inputField}
                     value={number_of_task}
                     placeholder='number_of_task' autoComplete='' onChange={(el) => {
                        let number = el.target.value
                        if (number <= 0) {
                           setNumberTask(1);
                        } else if (number > 60) {
                           setNumberTask(60);
                        } else {
                           setNumberTask(number);
                        }
                     }} />
                  <ErrorMessage name="number_of_task" component="div" />
               </Box>
               <Typography variant="body1" color="error">{error}</Typography>
               <ButtonSubmit text='Відправити' isSubmitting={isSubmiting} />
            </Form>
         </Formik>
      </div>
   )
}
