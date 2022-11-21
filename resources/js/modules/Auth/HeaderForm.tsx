import React from 'react'
import { NavLink } from 'react-router-dom';
//@ts-ignore
import styles from './style.module.scss';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

type FormHeaderType = {
   title: string
   textLink: string
   text: string
   link: string
}

const FormHeader = ({ title, textLink, text, link }: FormHeaderType) => {
   return (
      <div className={styles.headerForm}>
         <h3 className={styles.headerForm__title}>{title}</h3>
         <Box sx={{ textAlign: 'center' }}>
            {text} 
            <NavLink to={link} style={{ color: 'red' }}>
               <Typography variant="body1" color="fmenu.light" sx={{ display: 'inline' }}> {textLink}</Typography>
            </NavLink>
         </Box>
      </div>
   )
}
export default FormHeader;     