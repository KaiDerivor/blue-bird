import React, { useState, useEffect } from 'react'
import { AnswerComponentType } from './AnswerField'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
//@ts-ignore
import styles from './style.module.scss'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

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
            return userAnswers[task.number_of_task].split(',')[0]
         }
         return ''
      })
      setFieldAnswer2(() => {
         if (userAnswers[task.number_of_task]) {
            return userAnswers[task.number_of_task].split(',')[1]
         }
         return ''
      })
   }, [task.number_of_task])
   useEffect(() => {
      handleChange(`${fieldAnswer1 ? fieldAnswer1 : ','},${fieldAnswer2 ? fieldAnswer2 : ','}`)

   }, [fieldAnswer1, fieldAnswer2])

   const defineColor = (count: number) => {
      if (rightAnswers[count] === userAnswers[task.number_of_task].split(',')[count]) {
         return 'success'

      } else {
         if (userAnswers[task.number_of_task].split('')[count] !== rightAnswers[count]) {
            return 'error'
         }
      }

   }
   const color1 = isAsAnswer ? defineColor(0) : undefined;
   const color2 = isAsAnswer ? defineColor(1) : undefined;
   let userPoint=+(color1 === 'success') + +(color2 === 'success')
   return (
      <Box >
         <Box className={styles.rangeWrapper} sx={{ color: 'fpage.main', mb: 3 }}>
            <Stack direction='column' spacing={2}>
               <Stack direction='row' sx={{ alignItems: 'flex-end' }} spacing={1}>

                  <Typography variant="subtitle1" color="inherit"><strong>1.</strong></Typography>
                  <TextField
                     className={styles.rangeWrapper__fieldRange3}
                     inputProps={{ readOnly: isAsAnswer }}
                     color={color1}
                     type='number'
                     id="outlined-basic"
                     variant="outlined"
                     size='small'
                     value={fieldAnswer1}
                     focused={isAsAnswer}
                     onChange={(el) => {
                        setFieldAnswer1(el.target.value)
                     }}
                  />
                  {isAsAnswer && <TextField
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
                  }
               </Stack>
               <Stack direction='row' sx={{ alignItems: 'flex-end' }} spacing={1}>
                  <Typography variant="subtitle1" color="inherit"><strong>2.</strong></Typography>
                  <TextField
                     className={styles.rangeWrapper__fieldRange3}
                     inputProps={{ readOnly: isAsAnswer }}
                     color={color2}
                     type='number'
                     id="outlined-basic"
                     variant="outlined"
                     size='small'
                     value={fieldAnswer2}
                     focused={isAsAnswer}
                     onChange={(el) => {
                        setFieldAnswer2(el.target.value)
                     }}
                  />
                  {isAsAnswer && <TextField
                     className={styles.rangeWrapper__fieldRange3}
                     inputProps={{ readOnly: isAsAnswer }}
                     color='success'
                     type='number'
                     id="outlined-basic"
                     variant="outlined"
                     size='small'
                     value={rightAnswers[1]}
                     focused
                  />
                  }
               </Stack>
            </Stack>
         </Box>
         {isAsAnswer &&
            <>
               <Box>
                  <Typography variant="subtitle1" color="inherit">
                     Кількість балів: <strong>{userPoint}</strong>
                  </Typography>
               </Box>

            </>
         }
      </Box>
   )
}