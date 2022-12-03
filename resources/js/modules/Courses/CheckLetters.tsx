import React, { createRef, useEffect } from 'react'
import { AnswerComponentType } from './AnswerField'
import Box from '@mui/material/Box'
//@ts-ignore
import styles from './style.module.scss'
import { lettersOfAnswers } from '../../redux/taskReducer'

export const CheckLetters: React.FC<AnswerComponentType> = ({ handleChange, userAnswers, task, isAsAnswer }) => {
   const radioButtonsRange = {
      a1: [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()],
      a2: [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()],
      a3: [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()],
      a4: [createRef(), createRef(), createRef(), createRef(), createRef(), createRef()],
   };

   const rightAnswers = task.answer.split(',')
   useEffect(() => {
      const rangeAlredyAnswered = userAnswers[task.number_of_task]
      if (rangeAlredyAnswered) {
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
      const rangeAlredyAnswered = userAnswers[task.number_of_task]
      numberRow--;
      let maskRange = [',', ',', ',', ','];
      if (rangeAlredyAnswered) {
         maskRange = rangeAlredyAnswered.split('')
      }
      maskRange[numberRow] = `${answer}`;

      handleChange(maskRange.join(''));
   }
   const renderTableRow = (rowNumber: number) => {
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
                  <input hidden ref={radioButtonsRange[`a${rowNumber}`][5]} type="radio" value="5" name={`${task.number_of_task}-${rowNumber}`} className={styles.radioField} />
               </label>
            </td>

         </tr>)
   }

   return (
      <>
         <Box>
            <table className={styles.answerTable}>
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