import React, { useState } from 'react';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
//@ts-ignore
import styles from './style.module.scss'

import { DateEvents } from './DateEvents';
import { MainChapter } from './MainChapter';
import { Greetings } from './Greetings';
import { SelectedCourses } from './SelectedCourses';
import { NotFinished } from './NotFinished';
import Fade from '@mui/material/Fade'
import { useSelector } from 'react-redux';
import { getIsInit } from '../../redux/appSelector';
import { FormLog } from '../Auth/FormLog';
import { Navigate } from 'react-router-dom';

export const Profile = () => {
   const isInit = useSelector(getIsInit)
   if (!isInit) {
      return (
         <Navigate to='/login' />
      )
   }
   return (
      <Container maxWidth="xl" >
         <Fade in={true} timeout={500} style={{ transitionDelay: '500ms' }}>
            <Box sx={{ display: 'flex' }} className={styles.profileWrapper}>
               <Box className={styles.wrapperMain} sx={{ pr: 2 }}>
                  <Greetings />
                  <MainChapter />
                  <SelectedCourses />
                  <NotFinished />
               </Box>
               <Box className={styles.wrapperSide}>
                  <DateEvents />
               </Box>
            </Box>
         </Fade>
      </Container>
   )
}