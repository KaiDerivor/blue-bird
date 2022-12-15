import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { AppDispatch } from '../../redux/store'
import { getUserName } from '../../redux/appSelector'
import { useSelector } from 'react-redux'

export const Greetings = React.memo(() => {
   const userName = useSelector(getUserName)
   return (<Box sx={{ mb: 5, width: '100%', display: 'block' }}>
      <Typography variant="h3" color="fpage.main">Hi, {userName}</Typography>
      <Typography variant="h5" color="fpage.main">Радий тебе бачити тут! 😉 Попрацюємо?)</Typography>
   </Box>
   )
})