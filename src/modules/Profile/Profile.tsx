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

export const Profile = () => {


   return (
      <Container maxWidth="xl" sx={{ display: 'flex' }}>
         <Box className={styles.wrapperMain}sx={{pr:2}}>
         <Greetings />
            <MainChapter />
            <SelectedCourses />
            
         </Box>
         <Box className={styles.wrapperSide}>
            <CalendarProfile />
            <DateEvents />
         </Box>
      </Container>
   )
}