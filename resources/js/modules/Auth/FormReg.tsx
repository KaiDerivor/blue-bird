import React, { useState, useEffect } from 'react';
//@ts-ignore
import styles from './style.module.scss';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import FormLoyauts from './FormLayouts';
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import { ButtonSubmit } from './ButtonSubmit';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorText, getIsInit } from '../../redux/appSelector';
import { AppDispatch } from '../../redux/store';
import { Navigate } from 'react-router-dom';
import { FormDataRegType, registerThunk } from '../../redux/appReducer';

const FormReg = () => {
   const dispatch: any = useDispatch();

   const errorText = useSelector(getErrorText)
   const isInit = useSelector(getIsInit)

   const [isSubmiting, setIsSubmiting] = useState(false)
   useEffect(() => {
      if (errorText.length <= 1) {
         setIsSubmiting(false)
      }
   }, [errorText])


   if (isInit) {
      return <Navigate to='/profile' />
   }

   return (
      <Fade in={true} timeout={500} style={{ transitionDelay: '500ms' }}>
         <div>
            <FormLoyauts
               title='Реєстрація'
               text="Вже маєш аккаунт?"
               link='/login'
               textLink='Увійти'
            >
               <div>
                  <Formik
                     initialValues={{ email: '', password: '', password_confirmation: '', name: '' }}
                     validate={values => {
                        const errors = {};
                        if (!values.email) {
                           //@ts-ignore
                           errors.email = '*Обов\'язкове поле';
                        }
                        if (!values.password) {
                           //@ts-ignore
                           errors.password = '*Обов\'язкове поле';
                        }
                        if (values.password_confirmation !== values.password) {
                           //@ts-ignore
                           errors.password_confirmation = 'Різні паролі'
                        }
                        return errors;
                     }}
                     onSubmit={(formData: FormDataRegType) => {
                        dispatch(registerThunk(formData))
                        setIsSubmiting(true)
                     }}
                  >
                     <Form className={styles.forms}>
                        <Box>
                           <Field type="text" name="name" className={styles.inputField}
                              placeholder="Ім'я" autoComplete='' />
                           <ErrorMessage name="name" component="div" />
                        </Box>
                        <Box>
                           <Field type="email" name="email" className={styles.inputField}
                              placeholder='Поштова скринька' autoComplete='' />
                           <ErrorMessage name="email" component="div" />
                        </Box>
                        <Box>
                           <Field type="password" name="password" className={styles.inputField}
                              placeholder='Пароль' autoComplete='' />
                           <ErrorMessage name="password" component="div" />
                        </Box>
                        <Box>
                           <Field type="password" name="password_confirmation" className={styles.inputField}
                              placeholder='Підтвердіть пароль' autoComplete='' />
                           <ErrorMessage name="password_confirmation" component="div" />
                        </Box>
                        <ButtonSubmit text='Зареєструватись' isSubmitting={isSubmiting} />

                     </Form>
                  </Formik>
               </div>
            </FormLoyauts>
         </div>
      </Fade>
   )
}
export default FormReg

