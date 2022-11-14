
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useSelector } from 'react-redux'
import { getIsDarkMode } from '../../redux/appSelector'
import styles from './stylesSB.module.scss'


type ButtonNavigateType = {
   title: string
   subtitle: string
   element?: any
   icon?: JSX.Element
}
export const ButtonNavigate: React.FC<ButtonNavigateType> = ({ title, subtitle, element, icon }) => {
   const isDarkMode = useSelector(getIsDarkMode)
   return (

      <Box className={`${styles.buttonNavigate} ${element ? styles.hoverEffect : ''}`}
         sx={{
            backgroundColor: isDarkMode ? '#28292A' : '#F3F6FC', borderRadius: '24px',
            p: 3, textAlign: 'start',
            mb: 1, position: 'relative'
         }}
         onClick={() => {
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
      </Box>

   )
}