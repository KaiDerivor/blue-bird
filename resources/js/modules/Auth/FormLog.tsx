import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import FormLoyauts from './FormLayouts';
//@ts-ignore
import styles from './style.module.scss'
import Box from '@mui/material/Box'
import Fade from '@mui/material/Fade'
import { ButtonSubmit } from './ButtonSubmit';

export const FormLog = () => (
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
                  onSubmit={(values) => {
                     console.log(values) ///!
                  }}

               >
                  {({ isSubmitting }) => (
                     <Form className={styles.forms}>
                        <Box>
                           <Field type="email" name="email" className={styles.inputField} placeholder="Поштова скринька" />
                           <ErrorMessage name="email" component="div" />
                        </Box>
                        <Box>
                           <Field type="password" name="password" className={styles.inputField} placeholder='Пароль' />
                           <ErrorMessage name="password" component="div" />
                        </Box>
                        <ButtonSubmit text='Увійти' />
                     </Form>
                  )}
               </Formik>
            </div>
         </FormLoyauts>
      </div>
   </Fade>
);
