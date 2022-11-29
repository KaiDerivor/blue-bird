import React, { createRef, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { TaskRecordType } from '../../redux/taskReducer'
//@ts-ignore
import styles from './style.module.scss'
import TextField from '@mui/material/TextField'
import { Typography } from '@mui/material'
import { Stack } from '@mui/system'

const lettersOfAnswers = ['А', 'Б', 'В', 'Г', 'Д'];

type AnswerFieldType = {
   task: TaskRecordType
   userAnswers: any
   setUserAnswers: (arg1: any) => void
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
      <Box sx={{ pt: 3 }}>
         {task.task_type === 'letter4' || task.task_type === 'letter5'
            ? <CheckLetter task={task} handleChange={handleChange} userAnswers={userAnswers} />
            : task.task_type === 'short'
               ? <FieldShort handleChange={handleChange} userAnswers={userAnswers} task={task} />
               : task.task_type === 'letters'
                  ? <Letters handleChange={handleChange} userAnswers={userAnswers} task={task} />
                  : <Range handleChange={handleChange} userAnswers={userAnswers} task={task} />}
      </Box>
   )
}
type AnswerComponentType = {
   task: TaskRecordType
   handleChange: (arg1: string) => void
   userAnswers: any

}
export const CheckLetter: React.FC<AnswerComponentType> = ({ task, handleChange, userAnswers }) => {
   const refA = createRef()
   const refB = createRef()
   const refC = createRef()
   const refD = createRef()
   const refE = createRef()
   const refK = createRef()
   useEffect(() => {
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
                           <input ref={refA} type="radio" value="А" onChange={(el) => handleChange(el.target.value)} name={`${task.number_of_task}`} className={styles.radioField} /><span className={styles.marker}></span>
                        </label>
                     </td>
                     <td>
                        <label ref={refB} className={styles.wrapperRadio}>
                           <input type="radio" value="Б" defaultChecked={userAnswers[task.number_of_task] === 'Б'} onChange={(el) => handleChange(el.target.value)} name={`${task.number_of_task}`} className={styles.radioField} /><span className={styles.marker}></span>
                        </label>
                     </td>
                     <td>
                        <label className={styles.wrapperRadio}>
                           <input ref={refC} type="radio" value="В" defaultChecked={userAnswers[task.number_of_task] === 'В'} onChange={(el) => handleChange(el.target.value)} name={`${task.number_of_task}`} className={styles.radioField} /><span className={styles.marker}></span>
                        </label>
                     </td>
                     <td>
                        <label className={styles.wrapperRadio}>
                           <input ref={refD} type="radio" value="Г" defaultChecked={userAnswers[task.number_of_task] === 'Г'} onChange={(el) => handleChange(el.target.value)} name={`${task.number_of_task}`} className={styles.radioField} /><span className={styles.marker}></span>
                        </label>
                     </td>
                     {task.task_type === 'letter4' || task.task_type === 'letter5' &&
                        <td>
                           <label className={styles.wrapperRadio}>
                              <input ref={refE} type="radio" value="Д" defaultChecked={userAnswers[task.number_of_task] === 'Д'} onChange={(el) => handleChange(el.target.value)} name={`${task.number_of_task}`} className={styles.radioField} /><span className={styles.marker}></span>
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
export const FieldShort: React.FC<AnswerComponentType> = ({ handleChange, userAnswers, task }) => {
   const [fieldAnswer, setFieldAnswer] = useState(() => {
      if (userAnswers[task.number_of_task]) {
         return userAnswers[task.number_of_task]
      }
      return ''
   })
   return (
      <Box >
         <Typography variant="h5" color="fpage.main" sx={{ mb: 2 }}>Ваша відповідь</Typography>
         <TextField
            id="outlined-basic"
            label="Ваша відповідь"
            variant="outlined"
            size='small'
            value={fieldAnswer}
            onChange={(el) => {
               let answer = el.target.value;
               //@ts-ignore
               if (!isNaN(answer)) {
                  handleChange(answer)
                  setFieldAnswer(answer)
               }
            }}

         />

      </Box>
   )
}
export const Letters: React.FC<AnswerComponentType> = ({ handleChange, userAnswers, task }) => {

   let radioButtonsRange = {
      a1: [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()],
      a2: [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()],
      a3: [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()],
      a4: [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()],
   };

   const rangeAlredyAnswered = userAnswers[task.number_of_task]
   useEffect(() => {
      if (rangeAlredyAnswered) {
         const range = rangeAlredyAnswered.split('')
         for (let i = 0; i < 4; i++) {
            radioButtonsRange[`a${i + 1}`].forEach((element, index) => {
               if (range[i] === lettersOfAnswers[index]) {
                  element.current.checked = true;
               }
               else {
                  element.current.checked = false;
               }
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
export const Range: React.FC<AnswerComponentType> = ({ handleChange, userAnswers, task }) => {
   const [fieldAnswer1, setFieldAnswer1] = useState('')
   const [fieldAnswer2, setFieldAnswer2] = useState('')
   const [fieldAnswer3, setFieldAnswer3] = useState('')

   useEffect(() => {
      console.log(userAnswers[task.number_of_task])
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
         <Typography variant="h5" color="fpage.main" sx={{ mb: 2 }}>Ваша відповідь</Typography>
         <Box className={styles.rangeWrapper}>

            <TextField
               sx={{ mb: 2 }}
               type='number'
               id="outlined-basic"
               label="Ваша відповідь"
               variant="outlined"
               size='small'
               value={fieldAnswer1}
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
               sx={{ mb: 2 }}
               type='number'
               id="outlined-basic"
               label="Ваша відповідь"
               variant="outlined"
               size='small'
               value={fieldAnswer2}
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
               sx={{ mb: 2 }}
               type='number'
               id="outlined-basic"
               label="Ваша відповідь"
               variant="outlined"
               size='small'
               value={fieldAnswer3}
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

      </Box>
   )
}