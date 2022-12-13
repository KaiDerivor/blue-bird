import React, { createRef, useEffect, useRef } from 'react'
import { AnswerComponentType } from './AnswerField'
import Box from '@mui/material/Box'
//@ts-ignore
import styles from './style.module.scss'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import { ButtonTask } from './ButtonTask'

export const CheckLetter: React.FC<AnswerComponentType> = ({ task, handleChange, userAnswers, isAsAnswer = false }) => {
   const refA = createRef<HTMLInputElement>()
   const refB = createRef<HTMLInputElement>()
   const refC = createRef<HTMLInputElement>()
   const refD = createRef<HTMLInputElement>()
   const refE = createRef<HTMLInputElement>()
   const refK = createRef<HTMLInputElement>()

   const isCorrect = userAnswers[task.number_of_task] === task.answer

   if (isAsAnswer)
      useEffect(() => {
         switch (task.answer) {
            case 'А': {
               refA?.current?.classList.add(styles.radioField__correct)
               break

            }
            case 'Б': {
               refB?.current?.classList.add(styles.radioField__correct)
               break

            }
            case 'В': {
               refC?.current?.classList.add(styles.radioField__correct)
               break
            }
            case 'Г': {
               refD?.current?.classList.add(styles.radioField__correct)
               break
            }
            case 'Д': {
               refE?.current?.classList.add(styles.radioField__correct)
               break
            }
            default: {
               if (refK.current)
                  refK.current.checked = true
            }

         }

      }, [refK, task.number_of_task])

   useEffect(() => {
      switch (userAnswers[task.number_of_task]) {
         case 'А': {
            if (isAsAnswer) {
               userAnswers[task.number_of_task] === task.answer ? refA?.current?.classList.add(styles.radioField__correct) : refA?.current?.classList.add(styles.radioField__error)
            } else {
               if (refA.current)
                  refA.current.checked = true
            }
            break
         }
         case 'Б': {
            if (isAsAnswer) {
               userAnswers[task.number_of_task] === task.answer ? refB?.current?.classList.add(styles.radioField__correct) : refB?.current?.classList.add(styles.radioField__error)
            } else {
               if (refB.current)
                  refB.current.checked = true
            }
            break
         }
         case 'В': {
            if (isAsAnswer) {
               userAnswers[task.number_of_task] === task.answer ? refC?.current?.classList.add(styles.radioField__correct) : refC?.current?.classList.add(styles.radioField__error)
            } else {
               if (refC.current)
                  refC.current.checked = true
            }
            break
         }
         case 'Г': {
            if (isAsAnswer) {
               userAnswers[task.number_of_task] === task.answer ? refD?.current?.classList.add(styles.radioField__correct) : refD?.current?.classList.add(styles.radioField__error)
            } else {
               if (refD.current)
                  refD.current.checked = true
            }
            break
         }
         case 'Д': {
            if (isAsAnswer) {
               userAnswers[task.number_of_task] === task.answer ? refE?.current?.classList.add(styles.radioField__correct) : refE?.current?.classList.add(styles.radioField__error)
            } else {
               if (refE.current)
                  refE.current.checked = true
            }
            break
         }
         default: {
            if (refK.current)
               refK.current.checked = true
         }
      }
   }, [task.number_of_task])

   return (
      <>
         <Box sx={{ color: 'fpage.main' }}>
            <table className={styles.answerTable}>
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
                           <input ref={refA} type="radio" value="А"
                              disabled={isAsAnswer}
                              onChange={(el) => handleChange(el.target.value)}
                              name={`${task.number_of_task}`}
                              className={styles.radioField} />
                           <span className={styles.marker}></span>
                        </label>
                     </td>
                     <td>
                        <label className={styles.wrapperRadio}>
                           <input ref={refB} type="radio" value="Б"
                              onChange={(el) => handleChange(el.target.value)}
                              disabled={isAsAnswer}
                              name={`${task.number_of_task}`} className={styles.radioField} />
                           <span className={styles.marker}></span>
                        </label>
                     </td>
                     <td>
                        <label className={styles.wrapperRadio}>
                           <input ref={refC} type="radio" value="В"
                              disabled={isAsAnswer}
                              onChange={(el) => handleChange(el.target.value)}
                              name={`${task.number_of_task}`} className={styles.radioField} />
                           <span className={styles.marker}></span>
                        </label>
                     </td>
                     <td>
                        <label className={styles.wrapperRadio}>
                           <input ref={refD} type="radio" value="Г"
                              disabled={isAsAnswer}
                              onChange={(el) => handleChange(el.target.value)}
                              name={`${task.number_of_task}`} className={styles.radioField} />
                           <span className={styles.marker}></span>
                        </label>
                     </td>
                     {task.task_type === 'letter4' || task.task_type === 'letter5' &&
                        <td>
                           <label className={styles.wrapperRadio}>
                              <input ref={refE} type="radio" value="Д"
                                 disabled={isAsAnswer}
                                 onChange={(el) => handleChange(el.target.value)}
                                 name={`${task.number_of_task}`} className={styles.radioField} />
                              <span className={styles.marker}></span>
                           </label>
                        </td>
                     }

                  </tr>
               </tbody>
            </table>
            <Box sx={{ mb: 3 }}>
               <input ref={refK} type="radio" value="K" hidden
                  onChange={(el) => handleChange(el.target.value)} name={`${task.number_of_task}`} className={styles.radioField} /><span className={styles.marker}></span>
            </Box>
            {isAsAnswer &&
               <>
                  <Box>
                     <Typography variant="subtitle1" color="inherit">
                        Кількість балів: <strong>{isCorrect ? '1' : '0'}</strong>
                     </Typography>
                  </Box>
                
               </>
            }
         </Box >
      </>
   )
}