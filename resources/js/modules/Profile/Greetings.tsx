import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

export const Greetings = () => {
   return (<Box sx={{ mb: 5, width: '100%',display:'block' }}>
      <Typography variant="h3" color="fpage.main">Hi, user</Typography>
      <Typography variant="h5" color="fpage.main">Радий тебе бачити тут! 😉 Попрацюємо?)</Typography>
   </Box>
   )
}