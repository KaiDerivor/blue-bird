import React, { createRef, useEffect } from 'react'
import Box from '@mui/material/Box'
import { TaskRecordType } from '../../redux/taskReducer'
//@ts-ignore
import styles from './style.module.scss'
import { RefreshOutlined } from '@mui/icons-material'

type AnswerFieldType = {
   task: TaskRecordType
   setUserAnswers: (arg1: any) => void
   userAnswers: any
}
export const AnswerField: React.FC<AnswerFieldType> = ({ task, setUserAnswers, userAnswers }) => {

   const handleChange = (answer: string) => {
      setUserAnswers((prev => {
         return {
            ...prev,
            [task.number_of_task]: answer
         }
      }))
   };

   return (
      <CheckLetter task={task} checkHandler={handleChange} userAnswers={userAnswers} />
   )
}
type CheckLetterType = {
   task: TaskRecordType
   checkHandler: (arg1: string) => void
   userAnswers: any
}
export const CheckLetter: React.FC<CheckLetterType> = ({ task, checkHandler, userAnswers }) => {
   const refA = createRef()
   const refB = createRef()
   const refC = createRef()
   const refD = createRef()
   const refE = createRef()
   const refK = createRef()
   useEffect(() => {
      console.log(userAnswers[task.number_of_task])
      if (userAnswers[task.number_of_task] === 'A') {
         refA.current.checked = true
      } else if (userAnswers[task.number_of_task] === 'Б') {
         refB.current.checked = true
      } else if (userAnswers[task.number_of_task] === 'В') {
         refC.current.checked = true
      } else if (userAnswers[task.number_of_task] === 'Г') {
         refD.current.checked = true
      } else if (userAnswers[task.number_of_task] === 'Д') {
         refE.current.checked = true
      } else {
         refK.current.checked = true
      }
   }, [task.number_of_task])
   return (
      <Box>
         <table className="select-answers-variants">
            <tbody><tr>
               <th>А</th>
               <th>Б</th>
               <th>В</th>
               <th>Г</th>
               {task.task_type === 'letter4' || task.task_type === 'letter5' && <th>Д</th>}
            </tr>
               <tr>
                  <td>
                     <label className={styles.wrapperRadio}>
                        <input ref={refA} type="radio" value="А" onChange={(el) => checkHandler(el.target.value)} name={`${task.number_of_task}`} className={styles.radioField} /><span className={styles.marker}></span>
                     </label>
                  </td>
                  <td>
                     <label ref={refB} className={styles.wrapperRadio}>
                        <input type="radio" value="Б" defaultChecked={userAnswers[task.number_of_task] === 'Б'} onChange={(el) => checkHandler(el.target.value)} name={`${task.number_of_task}`} className={styles.radioField} /><span className={styles.marker}></span>
                     </label>
                  </td>
                  <td>
                     <label className={styles.wrapperRadio}>
                        <input ref={refC} type="radio" value="В" defaultChecked={userAnswers[task.number_of_task] === 'В'} onChange={(el) => checkHandler(el.target.value)} name={`${task.number_of_task}`} className={styles.radioField} /><span className={styles.marker}></span>
                     </label>
                  </td>
                  <td>
                     <label className={styles.wrapperRadio}>
                        <input ref={refD} type="radio" value="Г" defaultChecked={userAnswers[task.number_of_task] === 'Г'} onChange={(el) => checkHandler(el.target.value)} name={`${task.number_of_task}`} className={styles.radioField} /><span className={styles.marker}></span>
                     </label>
                  </td>
                  {task.task_type === 'letter4' || task.task_type === 'letter5' &&
                     <td>
                        <label className={styles.wrapperRadio}>
                           <input ref={refE} type="radio" value="Д" defaultChecked={userAnswers[task.number_of_task] === 'Д'} onChange={(el) => checkHandler(el.target.value)} name={`${task.number_of_task}`} className={styles.radioField} /><span className={styles.marker}></span>
                        </label>
                     </td>
                  }
                  <input ref={refK} type="radio" value="K" hidden
                     onChange={(el) => checkHandler(el.target.value)} name={`${task.number_of_task}`} className={styles.radioField} /><span className={styles.marker}></span>

               </tr>
            </tbody>
         </table>
         <div>

         </div>
      </Box >
   )
}