import React from "react"
import Box from '@mui/material/Box'
//@ts-ignore
import styles from './style.module.scss'
import Typography from '@mui/material/Typography'
import { ProfileCourseItem } from "./ProfileCourseItem"


export const NotFinished = () => {
   return (
      <Box sx={{mb:4}} >
         <Typography variant="h4" color="fpage.main" sx={{ pb: 3 }}>Незавершені дії</Typography>
         <Box className={styles.listSelected}>
            <ProfileCourseItem text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Consectecteetir'} navLink={'/courses/Consectecteetir'} stateItem={'35%'} />
            <ProfileCourseItem text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'adpsicing'} navLink={'/courses/adpsicing'} stateItem={'72%'} />
            <ProfileCourseItem text={'izards are a widespread group of squamate reptiles, with over 6,000'} title={'Elit'} navLink={'/courses/Elit'} stateItem={'10%'} />
         </Box>
      </Box>
   )
}