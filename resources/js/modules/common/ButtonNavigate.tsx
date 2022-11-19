
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { getIsDarkMode } from '../../redux/appSelector'
import styles from './stylesSB.module.scss'
import Paper from '@mui/material/Paper'

type ButtonNavigateType = {
   title: string
   subtitle: string
   element?: any
   icon?: JSX.Element
   fn?: () => void
}
export const ButtonNavigate: React.FC<ButtonNavigateType> = ({ title, subtitle, element, icon, fn }) => {
   const isDarkMode = useSelector(getIsDarkMode)


   return (

      <Paper className={`${styles.buttonNavigate}`}
         elevation={2}
         sx={{
            borderRadius: '24px',
            p: 3, textAlign: 'start',
            mb: 1, position: 'relative',
            cursor: element || fn ? 'pointer' : 'default',
            '&:hover': {
               backgroundColor: element ? 'bgmode.dark' : '',
            }
         }}
         onClick={() => {
            if (fn) {
               fn()
               return;
            }
            if (!element) return;
            element.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });
         }}
      >
         <Typography variant="h6" color="fpage.main" sx={{ pb: 1 }}>
            {title}
         </Typography>
         <Typography variant="body1" color="fpage.main">
            {subtitle}
         </Typography>
         <Box className={styles.icon} >
            {icon && icon}
         </Box>
      </Paper>

   )
}