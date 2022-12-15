import React from 'react'
//@ts-ignore
import styles from './style.module.scss'
import Box from '@mui/material/Box'
import { useSelector } from 'react-redux'
import { getIsDarkMode } from '../../redux/appSelector'

export const Loader: React.FC = () => {
   const isDarkMode = useSelector(getIsDarkMode)
   return (
      <Box className={styles.loaderWrapper}>
         <Box className={styles.loaderWrapper__loader} sx={{
            '&:after': {
               backgroundColor: isDarkMode ? '#fff' : '#fdd8aa'
            }
         }} />
      </Box>
   )
}