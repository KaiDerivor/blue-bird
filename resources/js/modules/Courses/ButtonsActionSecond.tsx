import React from 'react'
import { TaskSavedType, TaskType } from '../../redux/taskReducer'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import { ButtonTask } from './ButtonTask'
import { useDispatch, useSelector } from 'react-redux'
import { updateMe } from '../../redux/appReducer'
import { getIsSetData, getLikedTasks } from '../../redux/appSelector'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Typography from '@mui/material/Typography'


type SolutionType = {
   setIsOpenSolution: (arg1: boolean) => void
   isOpenSolution: boolean
   currTask: TaskType | TaskSavedType
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
            {(currTask.content || currTask?.rule?.id) &&
               < ButtonTask title='Дивитися пояснення'
                  fn={() => {//@ts-ignore
                     setIsOpenSolution((prev: boolean) => !prev)
                  }} />
            }
         </Box>
         <Box >
            <Collapse in={isOpenSolution}>
               <Box sx={{backgroundColor:'bgmode.main',p:2,borderRadius:'24px'}}>
                  {currTask?.rule?.title &&
                     <Box>
                        <Typography variant="h6" color="inherit">{currTask.rule.title}</Typography>
                        <Typography variant="body1" color="inherit">{currTask.rule.description}</Typography>
                     </Box>
                  }
                  {
                     currTask?.content &&
                     <Box>
                        <Typography variant="h6" color="inherit">Розв'язок</Typography>
                        <Typography variant="body1" color="inherit">{currTask.content}</Typography>
                     </Box>
                  }
               </Box>
            </Collapse>
         </Box>
      </>
   )
}