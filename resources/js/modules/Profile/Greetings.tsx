import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { getUserName } from '../../redux/appSelector'
import { useSelector } from 'react-redux'

export const Greetings = React.memo(() => {
   const userName = useSelector(getUserName)
   return (<Box sx={{ mb: 3, width: '100%', display: 'block', color: "fpage.main", pt: 1 }}>
      <Typography variant="h5" color="inherit" fontSize={{xs:'18px',sm:'26px'}} >Привіт, {userName}</Typography>
      <Typography variant="h6" color="inherit" fontSize={{xs:'16px',sm:'22px'}}>Радий тебе бачити тут! 😉 Попрацюємо?)</Typography>
   </Box>
   )
})