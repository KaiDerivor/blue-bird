import React, { useState, useEffect } from 'react'
import { AnswerComponentType } from './AnswerField'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
//@ts-ignore
import styles from './style.module.scss'

export const CheckRange2: React.FC<AnswerComponentType> = ({ handleChange, userAnswers, task, isAsAnswer }) => {
   const [fieldAnswer1, setFieldAnswer1] = useState('')
   const [fieldAnswer2, setFieldAnswer2] = useState('')
   const rightAnswers = task.answer.split(',')
   if (isAsAnswer) {
      userAnswers[task.number_of_task] = userAnswers[task.number_of_task] || ',,';
   }
   useEffect(() => {
      setFieldAnswer1(() => {
         if (userAnswers[task.number_of_task]) {
            return userAnswers[task.number_of_task].split('')[0]
         }
         return ''
      })
      setFieldAnswer2(() => {
         if (userAnswers[task.number_of_task]) {
            return userAnswers[task.number_of_task].split('')[1]
         }
         return ''
      })
   }, [task.number_of_task])
   useEffect(() => {
      handleChange(`${fieldAnswer1 ? fieldAnswer1 : ','}${fieldAnswer2 ? fieldAnswer2 : ','}`)

   }, [fieldAnswer1, fieldAnswer2])

   const defineColor = (count: number) => {
      return rightAnswers.includes(userAnswers[task.number_of_task].split('')[count])
         ? 'success'
         : userAnswers[task.number_of_task].split('')[count] !== rightAnswers[count]
            ? 'error'
            : undefined

   }
   const color1 = isAsAnswer ? defineColor(0) : undefined;
   const color2 = isAsAnswer ? defineColor(1) : undefined;

   return (
      <Box >
         <Box className={styles.rangeWrapper}>
            <TextField
               className={styles.rangeWrapper__fieldRange3}
               inputProps={{ readOnly: isAsAnswer }}
               color={color1}
               sx={{ mb: 2 }}
               type='number'
               id="outlined-basic"
               variant="outlined"
               size='small'
               value={fieldAnswer1}
               focused
               onChange={(el) => {
                  setFieldAnswer1(el.target.value)
               }}
            />
            <TextField
               className={styles.rangeWrapper__fieldRange3}
               inputProps={{ readOnly: isAsAnswer }}
               color={color2}
               sx={{ mb: 2 }}
               type='number'
               id="outlined-basic"
               variant="outlined"
               size='small'
               value={fieldAnswer2}
               focused
               onChange={(el) => {
                  setFieldAnswer2(el.target.value)
               }}
            />

         </Box>
         {isAsAnswer && <Box className={styles.rangeWrapper}>
            <TextField
               className={styles.rangeWrapper__fieldRange3}
               inputProps={{ readOnly: isAsAnswer }}
               color='success'
               sx={{ mb: 2 }}
               type='number'
               id="outlined-basic"
               variant="outlined"
               size='small'
               value={rightAnswers[0]}
               focused
            />
            <TextField
               className={styles.rangeWrapper__fieldRange3}
               inputProps={{ readOnly: isAsAnswer }}
               color='success'
               sx={{ mb: 2 }}
               type='number'
               id="outlined-basic"
               variant="outlined"
               size='small'
               value={rightAnswers[1]}
               focused
            />
         </Box>}
      </Box>
   )
}