
import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { lettersOfAnswers, TaskSavedType, TaskType } from '../../redux/taskReducer'
import { URL_STORAGE } from '../../redux/appReducer'
import { AnswerField } from './AnswerField'
import { CategoryRecordType } from '../../redux/catReducer'
import { TagRecordType } from '../../redux/tagReducer'
//@ts-ignore
import styles from './style.module.scss'
import Divider from '@mui/material/Divider'
import { ButtonsActionSecond } from './ButtonsActionSecond'

type TaskComponentType = {
  task: TaskType
  currCategory: CategoryRecordType
  currTag: TagRecordType
  setUserAnswers?: (value: any) => void
  userAnswers: Object
  isAsAnswer?: boolean

}
export const TaskComponent: React.FC<TaskComponentType> = ({
  task, currCategory,
  currTag, setUserAnswers,
  userAnswers, isAsAnswer = false
}) => {
  let taskAnswers = [] as Array<string>
  let taskQuestion = ''

  const [isOpenSolution, setIsOpenSolution] = useState(false)

  if (task.test_qa) {
    const taskQA = JSON.parse(task.test_qa)
    taskAnswers = taskQA.taskAnswers
    taskQuestion = taskQA.taskQuestion
  }
  return (
    <Box sx={{ color: 'fpage.main' }} key={task.id}>
      <Box sx={{ mb: 3 }}>
        <Divider textAlign="right">
          <Typography variant="subtitle1" color="inherit" className={styles.markNumberTask}
            sx={{
              border: '2px solid',
              borderColor: 'bgmode.dark',
              backgroundColor: 'bgmode.main',
              pr: 2,
              pl: 2
            }}
          >Завдання {task.number_of_task}</Typography>

        </Divider>

      </Box>
      <Box sx={{ pb: 3 }}>
        <Typography variant="body1" color="inherit">{taskQuestion}</Typography>
      </Box>
      {task.task &&
        <Box sx={{ pb: 3,minHeight:'200px' }}>
          {/* {task.task || <Box sx={{ height: '400px' }} />} */}
          <img src={`${URL_STORAGE}${task.task}`} alt={`${currCategory.textUrl}-${currTag.textUrl}-${task.number_of_task}`} loading="eager" />
        </Box>
      }
      <Box sx={{}}>
        {
          taskAnswers.length > 0 && taskAnswers.map((answerVariant, index) => {
            if (answerVariant)
              return <Typography key={index} variant="body1" color="inherit">
                {lettersOfAnswers[index]} {answerVariant}
              </Typography>
          })
        }
      </Box>
      <AnswerField
        task={task as TaskType}
        setUserAnswers={isAsAnswer ? () => { } : setUserAnswers}
        userAnswers={userAnswers}
        isAsAnswer={isAsAnswer}
      />
      {isAsAnswer &&
        <ButtonsActionSecond setIsOpenSolution={setIsOpenSolution} isOpenSolution={isOpenSolution} currTask={task} isAsAnswer={isAsAnswer} />
      }

    </Box >
  )
}