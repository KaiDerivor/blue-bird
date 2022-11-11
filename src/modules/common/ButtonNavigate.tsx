
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { getIsDarkMode } from '../../redux/appSelector'
import styles from './stylesSB.module.scss'


type ButtonNavigateType = {
   title: string
   subtitle: string
   element?: any
}
export const ButtonNavigate: React.FC<ButtonNavigateType> = ({ title, subtitle, element }) => {
   const isDarkMode = useSelector(getIsDarkMode)
   return (

      <Box className={`${styles.buttonNavigate} ${element ? styles.hoverEffect : ''}`}
         sx={{
            backgroundColor: isDarkMode ? '#28292A' : '#F3F6FC', borderRadius: '24px',
            p: 3, textAlign: 'start',
            mb: 1,
         }}
         onClick={() => {
            if (!element) return;
            element.current.scrollIntoView({ behavior: "smooth", block: "center", inline: "start" });
         }}
      >

         <Typography variant="h6" color="palette.fpage.main" sx={{ pb: 1 }}>
            {title}
         </Typography>
         <Typography variant="body1" color="palette.fpage.main">
            {subtitle}
         </Typography>
      </Box>

   )
}