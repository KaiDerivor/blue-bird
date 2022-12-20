import React from 'react'
import { TaskType } from '../../redux/taskReducer'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import { ButtonTask } from './ButtonTask'
import { AppDispatch } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { FormDataMeUpdateType, updateMe } from '../../redux/appReducer'
import { getIsSetData, getLikedTasks } from '../../redux/appSelector'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelect } from '@mui/base'

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
   const dispatch: any = useDispatch()
   const likedTasks = useSelector(getLikedTasks)
   const Icon = likedTasks.includes(currTask.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />
   const isUserInit = useSelector(getIsSetData)
   const saveTask = (idLiked: number) => {
      let isSetted = false;

      const sendMe = {
         likedTasks: likedTasks.filter(id => {
            if (id === idLiked) {
               isSetted = true
               return
            } else {
               return id
            }
         })
      }
      isSetted || sendMe.likedTasks.push(idLiked)
      dispatch(updateMe(sendMe))
   }
   return (
      <>
         <Box sx={{ pt: 2, mb: 3, display: 'flex', justifyContent: 'space-between' }}>
            <ButtonTask title='До збереженого'
               Icon={Icon}
               fn={() => saveTask(currTask.id)}
               isDisable={!isUserInit}
            />
            {currTask.content &&
               <ButtonTask title='Дивитися пояснення'
                  fn={() => {//@ts-ignore
                     setIsOpenSolution((prev) => !prev)
                  }} />
            }
         </Box>
         <Box >
            <Collapse in={isOpenSolution}>
               {currTask.content}
            </Collapse>
         </Box>
      </>
   )
}