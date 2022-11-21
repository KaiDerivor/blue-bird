import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import FormLoyauts from './FormLayouts';
//@ts-ignore
import styles from './style.module.scss'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import { ButtonSubmit } from './ButtonSubmit';
import { loginThunk } from '../../redux/appReducer';
import { AppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { FormDataLogType } from '../../redux/appReducer'
import { getErrorText, getIsInit } from '../../redux/appSelector';
import { Navigate } from 'react-router-dom';

export const FormLog = () => {
   const dispatch: AppDispatch = useDispatch();

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
            <FormLoyauts title='Увійти' text='Не маєте аккаунта?' link='/register' textLink='Зареєструватись' >
               <div>
                  <Formik
                     initialValues={{ email: '', password: '' }}
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
                        return errors;
                     }}
                     onSubmit={(values, { setSubmitting }) => {
                        const formData: FormDataLogType = values;
                        //@ts-ignore
                        dispatch(loginThunk(formData));
                        setIsSubmiting(true)

                     }}

                  >
                     {({ isSubmitting }) => (
                        <Form className={styles.forms}>
                           <Box>
                              <Field type="email" name="email" className={styles.inputField}
                                 placeholder="Поштова скринька" autoComplete={''} />
                              <ErrorMessage name="email" component="div" />
                           </Box>
                           <Box>
                              <Field type="password" name="password" className={styles.inputField}
                                 placeholder='Пароль' autoComplete={''} />
                              <ErrorMessage name="password" component="div" />
                           </Box>
                           <ButtonSubmit text='Увійти' isSubmitting={isSubmiting} />
                        </Form>
                     )}
                  </Formik>
               </div>
            </FormLoyauts>
         </div>
      </Fade>
   );
}
