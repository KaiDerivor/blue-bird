import React from 'react'
import { TaskType } from '../../redux/taskReducer'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import { ButtonTask } from './ButtonTask'

const buttonsActionStyle = {
   backgroundColor: 'bgmode.main',
   color: 'fpage.main',
   borderColor: 'bgmode.main',
   lineHeight: '2'
}

type SolutionType = {
   setIsOpenSolution: (arg1: boolean) => void
   isOpenSolution: boolean
   currTask: TaskType
   isAsAnswer?: boolean
}
export const ButtonsActionSecond: React.FC<SolutionType> = ({ setIsOpenSolution, isOpenSolution, currTask, isAsAnswer = false }) => {
   return (
      <>
         <Box sx={{ pt: 2, mb: 3, display: 'flex', justifyContent: 'space-between' }}>
            {currTask.content &&
               <ButtonTask title='Дивитися пояснення' fn={() => {//@ts-ignore
                  setIsOpenSolution((prev) => !prev)
               }} />
            }
            <ButtonTask title='До збереженого' fn={() => { console.log(currTask.id) }} />

         </Box>
         <Box >
            <Collapse in={isOpenSolution}>
               {currTask.content}
            </Collapse>
         </Box>
      </>
   )
}