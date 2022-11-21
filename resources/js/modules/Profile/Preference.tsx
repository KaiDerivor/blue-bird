import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { logoutThunk } from '../../redux/appReducer'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../redux/store'

export const Preference = () => {

   const dispatch:AppDispatch = useDispatch();
   
   const logoutHandler = () => {
      dispatch(logoutThunk())
   }
   return (
      <Box>
         <Button sx={{ color: 'fpage.main', textTransform: 'none' }} onClick={() => logoutHandler()}>
            Вийти
         </Button>
      </Box>
   )
}