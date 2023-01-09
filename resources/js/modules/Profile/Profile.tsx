import React, { useEffect } from 'react';
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
//@ts-ignore
import styles from './style.module.scss'
import { DateEvents } from './DateEvents';
import { MainChapter } from './MainChapter';
import { Greetings } from './Greetings';
import { SelectedCourses } from './SelectedCourses';
import Fade from '@mui/material/Fade'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getIsInit } from '../../redux/appSelector';
import { Navigate } from 'react-router-dom';
import { Preference } from './Preference';
import { getCategoriesInit } from '../../redux/catReducer';

const Profile = () => {
   const isInit = useSelector(getIsInit)
   const categories = useSelector(getCategories)
   const dispatch: any = useDispatch()

   useEffect(() => {
      if (categories.length <= 0) {
         // isRequested = true
         dispatch(getCategoriesInit())
      }
   }, [])

   if (!isInit) {
      return (
         <Navigate to='/login' />
      )
   }
   return (
      <Container maxWidth="xl" sx={{ pb: 3 }} >
         <Fade in={true} timeout={500} style={{ transitionDelay: '500ms' }}>
            <Box sx={{ display: 'flex', gap: 3 }} className={styles.profileWrapper}>
               <Box className={styles.wrapperMain} sx={{ pr: 2 }}>
                  <Greetings />
                  <MainChapter categories={categories} />
                  <SelectedCourses categories={categories} />
                  {/* <NotFinished /> */}
               </Box>
               <Box className={styles.wrapperSide} sx={{ mt: 2 }}>
                  <DateEvents />
                  <Preference />
               </Box>
            </Box>
         </Fade>
      </Container>
   )
}

export default Profile