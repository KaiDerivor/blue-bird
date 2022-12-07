import React, { useState } from 'react'
import { AnswerComponentType } from './AnswerField'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

export const CheckRange1: React.FC<AnswerComponentType> = ({ handleChange, userAnswers, task, isAsAnswer }) => {
   const [fieldAnswer, setFieldAnswer] = useState(() => {
      if (userAnswers[task.number_of_task]) {
         return userAnswers[task.number_of_task]
      }
      return ''
   })

   return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
         <TextField
            inputProps={{ readOnly: isAsAnswer }}
            color={isAsAnswer && `${userAnswers[task.number_of_task]}` === `${task.answer}` ? 'success' : `${userAnswers[task.number_of_task]}` !== `${task.answer}` ? 'error' : undefined}
            id="outlined-basic"
            label={isAsAnswer?'':"Ваша відповідь"}
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
   )
}