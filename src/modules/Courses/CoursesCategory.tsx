import { NavLink, useParams } from "react-router-dom"
import Typography from '@mui/material/Typography'
import Box from "@mui/material/Box"
import styles from './style.module.scss'
import { useSelector } from "react-redux"
import { getIsDarkMode } from "../../redux/appSelector"

export const CoursesCategory = () => {
   // console.log(useParams())
   const isDarkMode = useSelector(getIsDarkMode)
   const navLinkStyles = {
      color: isDarkMode ? '#E3E3E3' : '#717171'
   }
   return (
      <>
         <Typography variant="h3" color="fpage.main" sx={{ pb: 4 }}>Математика</Typography>
         <Box className={styles.boxSession} sx={{ mb: 5 }}>
            <Typography variant="h6" color="fpage.main" sx={{ pb: 2 }}>2022</Typography>
            <Box className={styles.boxSession__list}>
               <Typography variant="body1" color="fpage.main"><NavLink to="/" style={navLinkStyles}>2022-A</NavLink> </Typography>
               <Typography variant="body1" color="fpage.main"><NavLink to="/" style={navLinkStyles}>2022-Б</NavLink></Typography>
               <Typography variant="body1" color="fpage.main"><NavLink to="/" style={navLinkStyles}>2022 Пробна</NavLink></Typography>
            </Box>
         </Box>

         <Box className={styles.boxSession} sx={{ mb: 5 }}>
            <Typography variant="h6" color="fpage.main" sx={{ pb: 2 }}>2022</Typography>
            <Box className={styles.boxSession__list}>
               <Typography variant="body1" color="fpage.main">2022-A</Typography>
               <Typography variant="body1" color="fpage.main">2022-Б</Typography>
               <Typography variant="body1" color="fpage.main">2022 Пробна</Typography>
            </Box>
         </Box>

         <Box className={styles.boxSession} sx={{ mb: 5 }}>
            <Typography variant="h6" color="fpage.main" sx={{ pb: 2 }}>2022</Typography>
            <Box className={styles.boxSession__list}>
               <Typography variant="body1" color="fpage.main">2022-A</Typography>
               <Typography variant="body1" color="fpage.main">2022-Б</Typography>
               <Typography variant="body1" color="fpage.main">2022 Пробна</Typography>
            </Box>
         </Box>

         <Box className={styles.boxSession} sx={{ mb: 5 }}>
            <Typography variant="h6" color="fpage.main" sx={{ pb: 2 }}>2022</Typography>
            <Box className={styles.boxSession__list}>
               <Typography variant="body1" color="fpage.main">2022-A</Typography>
               <Typography variant="body1" color="fpage.main">2022-Б</Typography>
               <Typography variant="body1" color="fpage.main">2022 Пробна</Typography>
            </Box>
         </Box>



      </>
   )
}