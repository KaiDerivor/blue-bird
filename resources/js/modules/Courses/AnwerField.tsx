import React, { createRef, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { TaskRecordType } from '../../redux/taskReducer'
//@ts-ignore
import styles from './style.module.scss'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'

const lettersOfAnswers = ['А', 'Б', 'В', 'Г', 'Д'];

type AnswerFieldType = {
   task: TaskRecordType
   userAnswers: any
   setUserAnswers?: (arg1: any) => void
   isAsAnswer?: boolean
}
export const AnswerField: React.FC<AnswerFieldType> = ({ task, setUserAnswers, userAnswers, isAsAnswer = false }) => {

   const [answerType, setAnswerType] = useState('letter4')
   const [answerElement, setAnswerElement] = useState(<></>)
   const handleChange = (answer: string) => {
      if (setUserAnswers)
         setUserAnswers((prev => {
            return {
               ...prev,
               [task.number_of_task]: answer
            }
         }))
   };

   switch (task.task_type) {
      case ('letter4'): {
         if (answerType !== 'letter4') {
            setAnswerElement(<CheckLetter task={task} handleChange={handleChange} userAnswers={userAnswers} isAsAnswer={isAsAnswer} />)
            setAnswerType(task.task_type)
         }
         break;
      }
      case ('letter5'): {
         if (answerType !== 'letter5') {
            setAnswerElement(<CheckLetter task={task} handleChange={handleChange} userAnswers={userAnswers} isAsAnswer={isAsAnswer} />)
            setAnswerType(task.task_type)
         }
         break;
      }
      case 'short': {
         if (answerType !== 'short') {
            setAnswerElement(<Range1 handleChange={handleChange} userAnswers={userAnswers} task={task} isAsAnswer={isAsAnswer} />)
            setAnswerType(task.task_type)
         }
         break;
      }
      case 'letters': {
         if (answerType !== 'letters') {
            setAnswerElement(<Letters handleChange={handleChange} userAnswers={userAnswers} task={task} isAsAnswer={isAsAnswer} />)
            setAnswerType(task.task_type)
         }
         break;
      }
      case 'range': {
         if (answerType !== 'range') {
            setAnswerElement(<Range3 handleChange={handleChange} userAnswers={userAnswers} task={task} isAsAnswer={isAsAnswer} />)
            setAnswerType(task.task_type)
         }
         break;
      }
   }

   return (
      <Box sx={{ pt: 3, pb: 5 }}>
         {answerElement}
      </Box>
   )
}
type AnswerComponentType = {
   task: TaskRecordType
   handleChange: (arg1: string) => void
   userAnswers: any
   isAsAnswer?: boolean
}
export const CheckLetter: React.FC<AnswerComponentType> = ({ task, handleChange, userAnswers, isAsAnswer = false }) => {
   const refA = createRef()
   const refB = createRef()
   const refC = createRef()
   const refD = createRef()
   const refE = createRef()
   const refK = createRef()

   if (isAsAnswer)
      useEffect(() => {
         if (task.answer === 'A') {
            refA.current.classList.add(styles.radioField__correct)
         } else if (task.answer === 'Б') {
            refB.current.classList.add(styles.radioField__correct)
         } else if (task.answer === 'В') {
            refC.current.classList.add(styles.radioField__correct)
         } else if (task.answer === 'Г') {
            refD.current.classList.add(styles.radioField__correct)
         } else if (task.answer === 'Д') {
            refE.current.classList.add(styles.radioField__correct)
         } else {
            refK.current.checked = true
         }
      }, [refK, task.number_of_task])

   useEffect(() => {
      if (userAnswers[task.number_of_task] === 'А') {
         if (isAsAnswer) {
            userAnswers[task.number_of_task] === task.answer ? refA.current.classList.add(styles.radioField__correct) : refA.current.classList.add(styles.radioField__error)
         } else {
            refA.current.checked = true
         }
      } else if (userAnswers[task.number_of_task] === 'Б') {
         if (isAsAnswer) {
            userAnswers === task.answer ? refA.current.classList.add(styles.radioField__correct) : refA.current.classList.add(styles.radioField__error)
         } else {
            refB.current.checked = true
         }
      } else if (userAnswers[task.number_of_task] === 'В') {
         if (isAsAnswer) {
            userAnswers === task.answer ? refA.current.classList.add(styles.radioField__correct) : refA.current.classList.add(styles.radioField__error)
         } else {
            refC.current.checked = true
         }
      } else if (userAnswers[task.number_of_task] === 'Г') {
         if (isAsAnswer) {
            userAnswers === task.answer ? refA.current.classList.add(styles.radioField__correct) : refA.current.classList.add(styles.radioField__error)
         } else {
            refD.current.checked = true
         }
      } else if (userAnswers[task.number_of_task] === 'Д') {
         if (isAsAnswer) {
            userAnswers === task.answer ? refA.current.classList.add(styles.radioField__correct) : refA.current.classList.add(styles.radioField__error)
         } else {
            refE.current.checked = true
         }
      } else {
         refK.current.checked = true
      }
   }, [task.number_of_task])

   return (
      <>
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
            <div>
               <input ref={refK} type="radio" value="K" hidden
                  onChange={(el) => handleChange(el.target.value)} name={`${task.number_of_task}`} className={styles.radioField} /><span className={styles.marker}></span>
            </div>
         </Box >
      </>
   )
}

export const Letters: React.FC<AnswerComponentType> = ({ handleChange, userAnswers, task, isAsAnswer }) => {

   let radioButtonsRange = {
      a1: [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()],
      a2: [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()],
      a3: [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()],
      a4: [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()],
   };

   const rangeAlredyAnswered = userAnswers[task.number_of_task]
   const rightAnswers = task.answer.split(',')
   useEffect(() => {
      if (rangeAlredyAnswered) {
         // console.log(rightAnswers)
         // console.log(rangeAlredyAnswered)
         const range = rangeAlredyAnswered.split('')
         for (let i = 0; i < 4; i++) {
            radioButtonsRange[`a${i + 1}`].forEach((element, index) => {

               if (range[i] === lettersOfAnswers[index]) {
                  if (isAsAnswer) {
                     rightAnswers[i] === range[i] ? element.current.classList.add(styles.radioField__correct) : element.current.classList.add(styles.radioField__error)
                  } else {
                     element.current.checked = true;
                  }
               }
               else {
                  element.current.checked = false;
                  if (isAsAnswer) {
                     rightAnswers[i] === lettersOfAnswers[index] && element.current.classList.add(styles.radioField__correct)
                  }
               }
               element.current.disabled = isAsAnswer
            });

         }
      } else {
         for (let i = 0; i < 4; i++) {
            radioButtonsRange[`a${i + 1}`].forEach((element) => {
               element.current.checked = false;
            });

         }
      }

   }, [task.number_of_task])
   const checkAnswer = (answer, numberRow) => {
      numberRow--;
      let maskRange = [',', ',', ',', ','];
      if (rangeAlredyAnswered) {
         maskRange = rangeAlredyAnswered.split('')
      }
      maskRange[numberRow] = `${answer}`;
      handleChange(maskRange.join(''));
   }
   const renderTableRow = (rowNumber) => {
      return (
         <tr>
            <td>
               {rowNumber}
            </td>
            <td>
               <label className={styles.wrapperRadio}>
                  <input ref={radioButtonsRange[`a${rowNumber}`][0]} type="radio" value="А" onChange={(el) => checkAnswer(el.target.value, rowNumber)} name={`${task.number_of_task}-${rowNumber}`} className={styles.radioField} /><span className={styles.marker}></span>
               </label>
            </td>
            <td>
               <label className={styles.wrapperRadio}>
                  <input ref={radioButtonsRange[`a${rowNumber}`][1]} type="radio" value="Б" onChange={(el) => checkAnswer(el.target.value, rowNumber)} name={`${task.number_of_task}-${rowNumber}`} className={styles.radioField} /><span className={styles.marker}></span>
               </label>
            </td>
            <td>
               <label className={styles.wrapperRadio}>
                  <input ref={radioButtonsRange[`a${rowNumber}`][2]} type="radio" value="В" onChange={(el) => checkAnswer(el.target.value, rowNumber)} name={`${task.number_of_task}-${rowNumber}`} className={styles.radioField} /><span className={styles.marker}></span>
               </label>
            </td>
            <td>
               <label className={styles.wrapperRadio}>
                  <input ref={radioButtonsRange[`a${rowNumber}`][3]} type="radio" value="Г" onChange={(el) => checkAnswer(el.target.value, rowNumber)} name={`${task.number_of_task}-${rowNumber}`} className={styles.radioField} /><span className={styles.marker}></span>
               </label>
            </td>

            <td>
               <label className={styles.wrapperRadio}>
                  <input ref={radioButtonsRange[`a${rowNumber}`][4]} type="radio" value="Д" onChange={(el) => checkAnswer(el.target.value, rowNumber)} name={`${task.number_of_task}-${rowNumber}`} className={styles.radioField} /><span className={styles.marker}></span>
                  <input hidden ref={radioButtonsRange[`a${rowNumber}`][5]} type="radio" value="5" onChange={(el) => checkAnswer(el.target.value)} name={`${task.number_of_task}-${rowNumber}`} className={styles.radioField} />
               </label>
            </td>

         </tr>)
   }

   return (
      <>
         <Box>
            <table className="select-answers-variants">
               <tbody>
                  <tr>
                     <th></th>
                     <th>А</th>
                     <th>Б</th>
                     <th>В</th>
                     <th>Г</th>
                     <th>Д</th>
                  </tr>



                  {renderTableRow(1)}
                  {renderTableRow(2)}
                  {renderTableRow(3)}
                  {renderTableRow(4)}


               </tbody>
            </table>
            <div>
            </div>
         </Box >
      </>
   )
}
export const Range1: React.FC<AnswerComponentType> = ({ handleChange, userAnswers, task, isAsAnswer }) => {
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
            label="Ваша відповідь"
            variant="outlined"
            size='small'
            value={fieldAnswer}
            focused
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
            <TextField id="standard-basic" variant="standard" color='success' focused value={task.answer} inputProps={{ readOnly: isAsAnswer }} />
         }
      </Box>
   )
}
export const Range2: React.FC<AnswerComponentType> = ({ handleChange, userAnswers, task, isAsAnswer }) => {
   const [fieldAnswer1, setFieldAnswer1] = useState('')
   const [fieldAnswer2, setFieldAnswer2] = useState('')
   const rightAnswers = task.answer.split(',')
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

   return (
      <Box >
         <Box className={styles.rangeWrapper}>
            <TextField
               className={styles.rangeWrapper__fieldRange3}
               inputProps={{ readOnly: isAsAnswer }}
               color={isAsAnswer && userAnswers[task.number_of_task].split('')[0] === rightAnswers[0] ? 'success' : userAnswers[task.number_of_task].split('')[0] !== rightAnswers[0] ? 'error' : undefined}
               sx={{ mb: 2 }}
               type='number'
               id="outlined-basic"
               variant="outlined"
               size='small'
               value={fieldAnswer1}
               focused
               onChange={(el) => {
                  let number = el.target.value;
                  if (number === '-') {
                     return;
                  }
                  if (`${number}`.split('').length > 1 && `${number}`.split('')[1] === '-') {
                     return;
                  }
                  if (`${number}`.split('').length > 1) {
                     let lastNumber = +`${number}`.split('')[1]
                     lastNumber > 7 ? setFieldAnswer1('7') : setFieldAnswer1(`${lastNumber}`)
                  } else if (+number > 7) {
                     setFieldAnswer1('7')
                  } else {
                     setFieldAnswer1(el.target.value)
                  }
               }}
            />
            <TextField
               className={styles.rangeWrapper__fieldRange3}
               inputProps={{ readOnly: isAsAnswer }}
               color={isAsAnswer && userAnswers[task.number_of_task].split('')[1] === rightAnswers[0] ? 'success' : userAnswers[task.number_of_task].split('')[1] !== rightAnswers[0] ? 'error' : undefined}
               sx={{ mb: 2 }}
               type='number'
               id="outlined-basic"
               variant="outlined"
               size='small'
               value={fieldAnswer2}
               focused
               onChange={(el) => {
                  let number = el.target.value;
                  if (number === '-') {
                     return;
                  }
                  if (`${number}`.split('').length > 1 && `${number}`.split('')[1] === '-') {
                     return;
                  }
                  if (`${number}`.split('').length > 1) {
                     let lastNumber = +`${number}`.split('')[1]
                     lastNumber > 7 ? setFieldAnswer1('7') : setFieldAnswer1(`${lastNumber}`)
                  } else if (+number > 7) {
                     setFieldAnswer1('7')
                  } else {
                     setFieldAnswer2(el.target.value)
                  }


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
export const Range3: React.FC<AnswerComponentType> = ({ handleChange, userAnswers, task, isAsAnswer }) => {
   const [fieldAnswer1, setFieldAnswer1] = useState('')
   const [fieldAnswer2, setFieldAnswer2] = useState('')
   const [fieldAnswer3, setFieldAnswer3] = useState('')
   const rightAnswers = task.answer.split(',')
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

   return (
      <Box >
         <Box className={styles.rangeWrapper}>
            <TextField
               className={styles.rangeWrapper__fieldRange3}
               inputProps={{ readOnly: isAsAnswer }}
               color={isAsAnswer && rightAnswers.includes(userAnswers[task.number_of_task].split('')[0]) ? 'success' : userAnswers[task.number_of_task].split('')[0] !== rightAnswers[0] ? 'error' : undefined}
               sx={{ mb: 2 }}
               type='number'
               id="outlined-basic"
               variant="outlined"
               size='small'
               value={fieldAnswer1}
               focused
               onChange={(el) => {
                  let number = el.target.value;
                  if (number === '-') {
                     return;
                  }
                  if (`${number}`.split('').length > 1 && `${number}`.split('')[1] === '-') {
                     return;
                  }
                  if (`${number}`.split('').length > 1) {
                     let lastNumber = +`${number}`.split('')[1]
                     lastNumber > 7 ? setFieldAnswer1('7') : setFieldAnswer1(`${lastNumber}`)
                  } else if (+number > 7) {
                     setFieldAnswer1('7')
                  } else {
                     setFieldAnswer1(el.target.value)
                  }
               }}
            />
            <TextField
               className={styles.rangeWrapper__fieldRange3}
               inputProps={{ readOnly: isAsAnswer }}
               color={isAsAnswer && rightAnswers.includes(userAnswers[task.number_of_task].split('')[1]) ? 'success' : userAnswers[task.number_of_task].split('')[1] !== rightAnswers[0] ? 'error' : undefined}
               sx={{ mb: 2 }}
               type='number'
               id="outlined-basic"
               variant="outlined"
               size='small'
               value={fieldAnswer2}
               focused
               onChange={(el) => {
                  let number = el.target.value;
                  if (number === '-') {
                     return;
                  }
                  if (`${number}`.split('').length > 1 && `${number}`.split('')[1] === '-') {
                     return;
                  }
                  if (`${number}`.split('').length > 1) {
                     let lastNumber = +`${number}`.split('')[1]
                     lastNumber > 7 ? setFieldAnswer1('7') : setFieldAnswer1(`${lastNumber}`)
                  } else if (+number > 7) {
                     setFieldAnswer1('7')
                  } else {
                     setFieldAnswer2(el.target.value)
                  }


               }}
            />
            <TextField
               className={styles.rangeWrapper__fieldRange3}
               inputProps={{ readOnly: isAsAnswer }}
               color={isAsAnswer && rightAnswers.includes(userAnswers[task.number_of_task].split('')[2]) ? 'success' : userAnswers[task.number_of_task].split('')[2] !== rightAnswers[2] ? 'error' : undefined}
               sx={{ mb: 2 }}
               type='number'
               id="outlined-basic"
               variant="outlined"
               size='small'
               value={fieldAnswer3}
               focused
               onChange={(el) => {
                  let number = el.target.value;
                  if (number === '-') {
                     return;
                  }
                  if (`${number}`.split('').length > 1 && `${number}`.split('')[1] === '-') {
                     return;
                  }
                  if (`${number}`.split('').length > 1) {
                     let lastNumber = +`${number}`.split('')[1]
                     lastNumber > 7 ? setFieldAnswer1('7') : setFieldAnswer1(`${lastNumber}`)
                  } else if (+number > 7) {
                     setFieldAnswer1('7')
                  } else {
                     setFieldAnswer3(el.target.value)
                  }

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