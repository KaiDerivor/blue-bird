import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import styles from './style.module.scss'
//@ts-ignore

import { useState } from 'react';
import { CalendarProfile } from './CalendarProfile';
import { DateEvents } from './DateEvents';
import { MainChapter } from './MainChapter';
import { Greetings } from './Greetings';
import { SelectedCourses } from './SelectedCourses';
import { NotFinished } from './NotFinished';
import Fade from '@mui/material/Fade'

export const Profile = () => {


   return (
      <Container maxWidth="xl" >
         <Fade in={true} timeout={600} style={{ transitionDelay: '600ms' }}>
            <Box sx={{ display: 'flex' }}>
               <Box className={styles.wrapperMain} sx={{ pr: 2 }}>
                  <Greetings />
                  <MainChapter />
                  <SelectedCourses />
                  <NotFinished />
               </Box>
               <Box className={styles.wrapperSide}>
                  <CalendarProfile />
                  <DateEvents />
               </Box>
            </Box>
         </Fade>
      </Container>
   )
}