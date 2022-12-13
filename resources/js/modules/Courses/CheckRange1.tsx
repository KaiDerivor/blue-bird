import React, { useState } from 'react'
import { AnswerComponentType } from './AnswerField'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export const CheckRange1: React.FC<AnswerComponentType> = ({ handleChange, userAnswers, task, isAsAnswer }) => {
   const [fieldAnswer, setFieldAnswer] = useState(() => {
      if (userAnswers[task.number_of_task]) {
         return userAnswers[task.number_of_task]
      }
      return ''
   })
   const isCorrect = userAnswers[task.number_of_task] === task.answer

   return (
      <Box>
         <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 3 }}>
            <TextField
               inputProps={{ readOnly: isAsAnswer }}
               color={isAsAnswer && `${userAnswers[task.number_of_task]}` === `${task.answer}` ? 'success' : `${userAnswers[task.number_of_task]}` !== `${task.answer}` ? 'error' : undefined}
               id="outlined-basic"
               label={isAsAnswer ? '' : "Ваша відповідь"}
               variant="standard"
               size='small'
               value={fieldAnswer}
               focused={isAsAnswer}
               onChange={(el) => {
                  let answer = el.target.value;
                  //@ts-ignore
                  if (!isNaN(answer)) {
                     handleChange(answer)
                     setFieldAnswer(answer)
                  }
               }}

            />
            {(isAsAnswer && `${userAnswers[task.number_of_task]}` !== `${task.answer}`) &&
               <TextField id="standard-basic" variant="standard" size='small' color='success' focused value={task.answer} inputProps={{ readOnly: isAsAnswer }} />
            }
         </Box>
         {isAsAnswer &&
            <>
               <Box>
                  <Typography variant="subtitle1" color="inherit">
                     Кількість балів: <strong>{isCorrect ? '2' : '0'}</strong>
                  </Typography>
               </Box>

            </>
         }
      </Box>
   )
}