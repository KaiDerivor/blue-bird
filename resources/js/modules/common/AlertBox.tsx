import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
//@ts-ignore
import styles from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getErrorText } from '../../redux/appSelector';
import { AppDispatch } from '../../redux/store';
import { appActions } from '../../redux/appReducer';

export const AlertBox = () => {
   const dispatch: AppDispatch = useDispatch();

   const [open, setOpen] = useState(false);

   const errorText = useSelector(getErrorText)
   useEffect(() => {
      if (errorText && errorText.length > 1) {
         setOpen(true)
         setTimeout(() => {
            dispatch(appActions.eraseError())
            setOpen(false)
         }, 4000)
      }
   }, [errorText])

   return (
      <Box sx={{ zIndex: 1500 }} className={styles.alertBox}>
         <Collapse in={open}>
            <Box className={styles.alertBox__alert} sx={{ backgroundColor: 'bgmode.light', p: 2 }}>
               {errorText}
            </Box>
         </Collapse>
      </Box>
   );
}