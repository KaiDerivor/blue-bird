import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
//@ts-ignore
import styles from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getErrorText } from '../../redux/appSelector';
import { AppDispatch } from '../../redux/store';
import { actions } from '../../redux/appReducer';

export const AlertBox = () => {
   const dispatch: AppDispatch = useDispatch();

   const [open, setOpen] = useState(false);

   const errorText = useSelector(getErrorText)
   useEffect(() => {
      if (errorText.length > 1) {
         setOpen(true)
      }
   }, [errorText])

   return (
      <Box sx={{}} className={styles.alertBox}>
         <Collapse in={open}>
            <Alert severity="info"
               action={
                  <IconButton
                     aria-label="close"
                     color="inherit"
                     size="small"
                     onClick={() => {
                        setOpen(false);
                        dispatch(actions.eraseError())
                     }}
                  >
                     <CloseIcon fontSize="inherit" />
                  </IconButton>
               }

            >
               {errorText}
            </Alert>
         </Collapse>
      </Box>
   );
}