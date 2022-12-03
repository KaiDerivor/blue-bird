import React, { useState, useEffect } from 'react'
import { AnswerComponentType } from './AnswerField'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
//@ts-ignore
import styles from './style.module.scss'

export const CheckRange3: React.FC<AnswerComponentType> = ({ handleChange, userAnswers, task, isAsAnswer }) => {
   const [fieldAnswer1, setFieldAnswer1] = useState('')
   const [fieldAnswer2, setFieldAnswer2] = useState('')
   const [fieldAnswer3, setFieldAnswer3] = useState('')
   const rightAnswers = task.answer.split(',')

   if (isAsAnswer) {
      userAnswers[task.number_of_task] = userAnswers[task.number_of_task] || ',,,';
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
      setFieldAnswer3(() => {
         if (userAnswers[task.number_of_task]) {
            return userAnswers[task.number_of_task].split('')[2]
         }
         return ''
      })
   }, [task.number_of_task])
   useEffect(() => {
      handleChange(`${fieldAnswer1 ? fieldAnswer1 : ','}${fieldAnswer2 ? fieldAnswer2 : ','}${fieldAnswer3 ? fieldAnswer3 : ','}`)

   }, [fieldAnswer1, fieldAnswer2, fieldAnswer3])

   const onValidate = (number: string, fn: Function) => {
      if (number === '-') {
         return;
      }else if(+number===0){
         fn(1)
      }
      if (`${number}`.split('').length > 1 && `${number}`.split('')[1] === '-') {
         return;
      }
      if (`${number}`.split('').length > 1) {
         let lastNumber = +`${number}`.split('')[1]
         lastNumber > 7 ? fn('7') : fn(`${lastNumber}`)
      } else if (+number > 7) {
         fn('7')
      } else {
         fn(number)
      }
   }

   const defineColor = (count: number) => {
      return rightAnswers.includes(userAnswers[task.number_of_task].split('')[count])
         ? 'success'
         : userAnswers[task.number_of_task].split('')[count] !== rightAnswers[count]
            ? 'error'
            : undefined

   }
   const color1 = isAsAnswer ? defineColor(0) : undefined;
   const color2 = isAsAnswer ? defineColor(1) : undefined;
   const color3 = isAsAnswer ? defineColor(2) : undefined;
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
               focused={isAsAnswer}
               onChange={(el) => {
                  onValidate(el.target.value, setFieldAnswer1)
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
               focused={isAsAnswer}
               onChange={(el) => {
                  onValidate(el.target.value, setFieldAnswer2)
               }}
            />
            <TextField
               className={styles.rangeWrapper__fieldRange3}
               inputProps={{ readOnly: isAsAnswer }}
               color={color3}
               sx={{ mb: 2 }}
               type='number'
               id="outlined-basic"
               variant="outlined"
               size='small'
               value={fieldAnswer3}
               focused={isAsAnswer}
               onChange={(el) => {
                  onValidate(el.target.value, setFieldAnswer3)
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
            <TextField
               className={styles.rangeWrapper__fieldRange3}
               inputProps={{ readOnly: isAsAnswer }}
               color='success'
               sx={{ mb: 2 }}
               type='number'
               id="outlined-basic"
               variant="outlined"
               size='small'
               value={rightAnswers[2]}
               focused

            />
         </Box>}
      </Box>
   )
}