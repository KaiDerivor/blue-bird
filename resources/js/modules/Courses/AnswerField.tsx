import React from 'react'
import Box from '@mui/material/Box'
import { TaskType } from '../../redux/taskReducer'
import { CheckLetter } from './CheckLetter'
import { CheckLetters } from './CheckLetters'
import { CheckRange1 } from './CheckRange1'
import { CheckRange2 } from './CheckRange2'
import { CheckRange3 } from './CkeckRange3'

type AnswerFieldType = {
   task: TaskType
   setUserAnswers?: (arg1: any) => void
   userAnswers: any
   isAsAnswer?: boolean
}
export const AnswerField: React.FC<AnswerFieldType> = ({ task, setUserAnswers, userAnswers, isAsAnswer = false }) => {

   const handleChange = (answer: string) => {
      if (setUserAnswers)
         setUserAnswers(prev => {
            return {
               ...prev,
               [task.number_of_task]: answer
            }
         })
   };

   return (
      <Box sx={{ pt: 3, pb: 5 }}>
         {
            task.task_type === 'letters'
               ? <CheckLetters handleChange={handleChange} userAnswers={userAnswers} task={task} isAsAnswer={isAsAnswer} />
               : task.task_type === 'range1'
                  ? <CheckRange1 handleChange={handleChange} userAnswers={userAnswers} task={task} isAsAnswer={isAsAnswer} />
                  : task.task_type === 'range2'
                     ? <CheckRange2 handleChange={handleChange} userAnswers={userAnswers} task={task} isAsAnswer={isAsAnswer} />
                     : task.task_type === 'range3'
                        ? <CheckRange3 handleChange={handleChange} userAnswers={userAnswers} task={task} isAsAnswer={isAsAnswer} />
                        : <CheckLetter task={task} handleChange={handleChange} userAnswers={userAnswers} isAsAnswer={isAsAnswer} />
         }
      </Box>
   )

}
export type AnswerComponentType = {
   task: TaskType
   handleChange: (arg1: string) => void
   userAnswers: any
   isAsAnswer?: boolean
}



