import React, { useState } from 'react'
//@ts-ignore
import styles from './stylesSB.module.scss'
import Box from '@mui/material/Box'
import LightModeIcon from '@mui/icons-material/LightMode';
import IconButton from '@mui/material/IconButton';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from '../../redux/appReducer';

type ToggleThemeModeType = {
   toggleThemeMode: () => void
   drawerWidth?: number
}
export const ToggleThemeMode: React.FC<ToggleThemeModeType> = ({ toggleThemeMode, drawerWidth }) => {
   // const themeMod = useSelector(getIsDarkMode);
   const dispatch: any = useDispatch();

   // const userRole = useSelector(getUserRole)
   const [isLightMode, setIsLightMode] = useState(false)

   const toggleTheme = () => {
      setIsLightMode(prev => !prev)
      dispatch(appActions.toggleThemeMod())
      toggleThemeMode();
   }
   return <Box sx={{ margin: ' 15px auto' }}>
      <IconButton className={`${styles.switcher} ${isLightMode ? styles.switcher_lightMode : ''}`} sx={{
         width: drawerWidth ? drawerWidth - 35 : '22%',
         margin: '0 auto'
      }} onClick={() => toggleTheme()}>
         < LightModeIcon className={styles.lightIcon} />
         <DarkModeOutlinedIcon className={styles.darkIncon} />
      </IconButton>
   </Box >
}