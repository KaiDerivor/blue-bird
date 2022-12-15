import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { appActions, AppThemesType, logoutThunk } from '../../redux/appReducer'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { getAppTheme } from '../../redux/appSelector'

export const Preference = React.memo(() => {

   const dispatch: any = useDispatch();
   const appTheme = useSelector(getAppTheme)
   const [theme, setTheme] = React.useState<AppThemesType>(appTheme);

   const handleChange = (themeName: AppThemesType) => {
      setTheme(themeName)
      dispatch(appActions.setTheme(themeName))
   };

   const logoutHandler = () => {
      dispatch(logoutThunk())
   }
   return (
      <Box sx={{ backgroundColor: 'bgmode.main', color: 'fpage.main', p: 2, borderRadius: '24px' }}>
         <Typography variant="h6" color="inherit" sx={{ pb: 2 }}>Налаштування</Typography>
         <Box>
            <Stack direction='row' sx={{ alignItems: 'center', gap: 2 }}>
               <Typography variant="body1" color="inherit">Вибрати тему</Typography>
               <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <Select
                     value={theme}
                     onChange={(el) => handleChange(el.target.value as AppThemesType)}
                     displayEmpty
                     size='small'
                     inputProps={{ 'aria-label': 'Without label' }}
                  >
                     <MenuItem value='RED'>Червоний</MenuItem>
                     <MenuItem value='GREEN'>Зелений</MenuItem>
                     <MenuItem value='YELLOW'>Жовтий</MenuItem>
                     <MenuItem value='PURPLE'>Фіолетовий</MenuItem>
                  </Select>
               </FormControl>
            </Stack>
            <Button sx={{ color: 'inherit', textTransform: 'none' }} onClick={() => logoutHandler()}>
               Вийти
            </Button>
         </Box>
      </Box>
   )
})