import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Box from '@mui/material/Box'
import 'react-calendar/dist/Calendar.css';
import styles from './style.module.scss'

export const CalendarProfile = () => {
   const [value, onChange] = useState(new Date());

   return (
      <Box sx={{pb:3}}>
         {/* <Calendar onChange={onChange} value={value}
            className={styles.calendarProfile}
            defaultView='month'
            prev2Label={''}
            next2Label={''}
            locale={'uk-UK'}
         /> */}
      </Box>
   );
}