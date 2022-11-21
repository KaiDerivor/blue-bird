import React from 'react';
//@ts-ignore
import styles from './style.module.scss';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import FormLoyauts from './FormLayouts';
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import { ButtonSubmit } from './ButtonSubmit';

export const FormReg = () => {
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
                     initialValues={{ email: '', password: '' }}
                     validate={values => {
                        const errors = {};
                        if (!values.email) {
                           //@ts-ignore
                           errors.email = 'Required';
                        }
                        return errors;
                     }}
                     onSubmit={(values) => {
                        console.log(values)
                     }}

                  >
                     {/* {({ isSubmitting }) => ( */}
                     <Form className={styles.forms}>
                        <Box>
                           <Field type="text" name="name" className={styles.inputField} placeholder="Ім'я" />
                           <ErrorMessage name="name" component="div" />
                        </Box>
                        <Box>
                           <Field type="email" name="email" className={styles.inputField} placeholder='Поштова скринька' />
                           <ErrorMessage name="email" component="div" />
                        </Box>
                        <Box>
                           <Field type="password" name="password" className={styles.inputField} placeholder='Пароль' />
                           <ErrorMessage name="password" component="div" />
                        </Box>
                        <Box>
                           <Field type="password" name="password_confirmation" className={styles.inputField} placeholder='Підтвердіть пароль' />
                           <ErrorMessage name="password" component="div" />
                        </Box>
                        <ButtonSubmit text='Зареєструватись' />

                     </Form>
                     {/* )} */}
                  </Formik>
               </div>
            </FormLoyauts>
         </div>
      </Fade>
   )
}

