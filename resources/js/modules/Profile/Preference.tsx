import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { appActions, AppThemesType, logoutThunk, updateMe } from '../../redux/appReducer'
import { useDispatch, useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { getAppTheme } from '../../redux/appSelector'
import { Formik, Field, Form, ErrorMessage } from 'formik'
//@ts-ignore
import styles from './style.module.scss'
import Collapse from '@mui/material/Collapse'
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline'
import PasswordIcon from '@mui/icons-material/Password'
import { NavLink } from 'react-router-dom'

export const Preference = React.memo(() => {

   const dispatch: any = useDispatch();
   const appTheme = useSelector(getAppTheme)
   const [theme, setTheme] = React.useState<AppThemesType>(appTheme);

   const handleChangeTheme = (themeName: AppThemesType) => {
      setTheme(themeName)
      dispatch(appActions.setTheme(themeName))
   };

   const logoutHandler = () => {
      dispatch(logoutThunk())
   }
   return (
      <Box sx={{ backgroundColor: 'bgmode.main', color: 'fpage.main', p: 2, borderRadius: '24px' }}>
         <Typography variant="h6" color="inherit" sx={{ pb: 2 }}>Налаштування</Typography>
         <Box sx={{ color: 'fpage.main' }}>
            <PreferenceChangeTheme handleChangeTheme={handleChangeTheme} theme={theme} />
            <PreferenceChangePassword />
            <PreferenceChangeName />
            <NavLink to='/support' style={{ color: 'inherit' }}><Typography className={styles.alignLeft} variant="subtitle1" color="inherit">Support</Typography> </NavLink>
            <NavLink to='/donate' style={{ color: 'inherit' }}><Typography className={styles.alignLeft} variant="subtitle1" color="inherit">Dontate</Typography> </NavLink>
            <Button sx={{ color: 'inherit', display: 'block', textTransform: 'none', marginLeft: 'auto', mt: 1 }} onClick={() => logoutHandler()}>
               Вийти
            </Button>
         </Box>
      </Box>
   )
})


type PreferenceChangeThemeType = {
   handleChangeTheme: (arg1: AppThemesType) => void
   theme: AppThemesType
}
const PreferenceChangeTheme: React.FC<PreferenceChangeThemeType> = ({ handleChangeTheme, theme }) => <Stack direction='row' sx={{ alignItems: 'center', gap: 2 }}>
   <Typography variant="subtitle2" color="inherit">Вибрати тему</Typography>
   <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
         value={theme}
         onChange={(el) => handleChangeTheme(el.target.value as AppThemesType)}
         displayEmpty
         size='small'
         inputProps={{ 'aria-label': 'Without label' }}
      >
         <MenuItem value='RED'><Typography variant="subtitle2" color="inherit">Червоний</Typography></MenuItem>
         <MenuItem value='GREEN'><Typography variant="subtitle2" color="inherit">Зелений</Typography></MenuItem>
         <MenuItem value='YELLOW'><Typography variant="subtitle2" color="inherit">Жовтий</Typography></MenuItem>
         <MenuItem value='PURPLE'><Typography variant="subtitle2" color="inherit">Фіолетовий</Typography></MenuItem>
      </Select>
   </FormControl>
</Stack>

type FormErrorHandlerPassword = {
   password: string
   passwordConfirmation: string
}
const PreferenceChangePassword = () => {
   const [isOpenSetting, setIsOpenSetting] = useState(false)
   const dispatch: any = useDispatch()
   const onOpenSetting = () => {
      setIsOpenSetting((prev: boolean) => !prev)
   }
   return (
      <Box sx={{ color: 'fpage.main' }}>
         <Button
            className={styles.titleButton}
            sx={{ color: 'inherit' }}
            onClick={onOpenSetting}
            endIcon={<PasswordIcon />}
         >
            <Typography variant="subtitle2" color="inherit" sx={{ flexGrow: 1, textAlign: 'start' }}>Змінити пароль</Typography>
         </Button>
         <Collapse in={isOpenSetting}>
            <Box sx={{ pt: 1, pb: 1 }}>
               <Formik
                  initialValues={{
                     password: '',
                     passwordConfirmation: ''
                  }}
                  onSubmit={(values) => {
                     dispatch(values.password)
                     setIsOpenSetting(false)
                  }}
                  validate={values => {
                     const errors = {} as FormErrorHandlerPassword;
                     if (!values.password) {
                        errors.password = '*Обов\'язкове поле';
                     }
                     if (!values.passwordConfirmation) {
                        errors.passwordConfirmation = '*Обов\'язкове поле';
                     }
                     if (values.password !== values.passwordConfirmation) {
                        errors.passwordConfirmation = 'Паролі не збігаються ';
                     }
                     return errors;
                  }}
               >
                  <Form className={styles.formWrapper} >
                     <Box className={styles.formWrapper__box}>
                        <Box className={styles.formWrapper__fieldWrapper}
                           sx={{ '& input': { borderColor: 'bgmode.dark' } }}
                        >
                           <Field type="password" name="password"
                              className={styles.formWrapper__field}
                              placeholder="Password" autoComplete=''
                           />
                           <Typography variant="caption" color="warning">
                              <ErrorMessage name='password' />
                           </Typography>
                        </Box>
                        <Box className={styles.formWrapper__fieldWrapper}
                           sx={{ '& input': { borderColor: 'bgmode.dark' } }}
                        >
                           <Field type="password" name="passwordConfirmation"
                              className={styles.formWrapper__field}
                              placeholder="Confirm password" autoComplete=''
                           />
                           <Typography variant="caption" color="warning">
                              <ErrorMessage name='passwordConfirmation' />
                           </Typography>
                        </Box>
                     </Box>
                     <Button type='submit' size='small' variant='outlined'
                        sx={{ color: 'fpage.main', borderColor: 'bgmode.dark' }}
                     >Змінити</Button>
                  </Form>
               </Formik>
            </Box>
         </Collapse >
      </Box >

   )
}

type FormErrorHandlerNameType = { name: string }
const PreferenceChangeName = () => {
   const dispatch: any = useDispatch()
   const [isOpenSetting, setIsOpenSetting] = useState(false)
   const onOpenSetting = () => {
      setIsOpenSetting((prev: boolean) => !prev)
   }
   return (
      <Box sx={{ color: 'fpage.main' }}>
         <Button
            className={styles.titleButton}
            sx={{ color: 'inherit' }}
            onClick={onOpenSetting}
            endIcon={<DriveFileRenameOutlineIcon />}
         >
            <Typography variant="subtitle2" color="inherit" sx={{ flexGrow: 1, textAlign: 'start' }}>Змінити ім'я</Typography>
         </Button>
         <Collapse in={isOpenSetting}>
            <Box sx={{ pt: 1, pb: 1 }}>
               <Formik
                  initialValues={{
                     name: ''
                  }}
                  onSubmit={(values) => {
                     dispatch(updateMe(values))
                     setIsOpenSetting(false)
                  }}
                  validate={values => {
                     const errors = {} as FormErrorHandlerNameType;
                     if (!values.name) {
                        errors.name = '*Обов\'язкове поле';
                     }
                     if (values.name.length < 3) {
                        errors.name = 'Мінімальна кількість символів 3';
                     }
                     return errors;
                  }}
               >
                  <Form className={styles.formWrapper} >
                     <Box className={styles.formWrapper__box}>
                        <Box className={styles.formWrapper__fieldWrapper}
                           sx={{ '& input': { borderColor: 'bgmode.dark' } }}
                        >
                           <Box className='rowColumn'>
                              <Field type="text" name="name"
                                 className={styles.formWrapper__field}
                                 placeholder="І'мя" autoComplete=''
                              />
                              <Typography variant="caption" color="warning">
                                 <ErrorMessage name='name' />
                              </Typography>
                           </Box>
                        </Box>

                     </Box>
                     <Button type='submit' size='small' variant='outlined'
                        sx={{ color: 'fpage.main', borderColor: 'bgmode.dark' }}
                     >Змінити</Button>
                  </Form>
               </Formik>
            </Box>
         </Collapse>
      </Box >

   )
}
