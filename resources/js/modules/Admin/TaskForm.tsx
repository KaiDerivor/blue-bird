import React, { useState, useEffect } from 'react';
//@ts-ignore
import styles from './style.module.scss';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, getErrorText, getIsInit, getTags } from '../../redux/appSelector';
import { AppDispatch } from '../../redux/store';
import { Navigate } from 'react-router-dom';
import { FormDataRegType, registerThunk } from '../../redux/appReducer';
import { ButtonSubmit } from '../Auth/ButtonSubmit';
import { getCategoriesInit } from '../../redux/catReducer';
import { getTagsInit } from '../../redux/tagReducer';

export const TaskForm = () => {
   const dispatch: AppDispatch = useDispatch();

   const errorText = useSelector(getErrorText)
   const categories = useSelector(getCategories)
   const tags = useSelector(getTags)

   const [isSubmiting, setIsSubmiting] = useState(false)
   useEffect(() => {
      if (errorText.length <= 1) {
         setIsSubmiting(false)
      }

   }, [errorText])

   useEffect(() => {
      if (!categories) {
         //@ts-ignore
         dispatch(getCategoriesInit())
      }
      if (!tags) {
         // @ts-ignore
         dispatch(getTagsInit())
      }
   }, [])

   return (
      <div>
         <Formik
            initialValues={{ email: '', password: '', password_confirmation: '', name: '' }}
            validate={(values: any) => {
               const errors = {};
               // if (!values.email) {
               //    //@ts-ignore
               //    errors.email = '*Обов\'язкове поле';
               // }
               // if (!values.password) {
               //    //@ts-ignore
               //    errors.password = '*Обов\'язкове поле';
               // }
               // if (values.password_confirmation !== values.password) {
               //    //@ts-ignore
               //    errors.password_confirmation = 'Різні паролі'
               // }
               return errors;
            }}
            onSubmit={(formData) => {
               //@ts-ignore
               console.log(formData)
            }}
         >
            {/* 'file'=>'required|file',
            'answer'=>'string',
            'content'=>'string',
            'category_id'=>'required',
            'tags'=>'',
            'number_of_task'=>'' */}
            <Form className={styles.forms}>
               <Box>
                  <Field as="textarea" rows='10' name="answer" className={styles.inputField}
                     placeholder="answer" autoComplete='' />
                  <ErrorMessage name="answer" component="div" />
               </Box>
               <Box>
                  <Field type="text" name="content" className={styles.inputField}
                     placeholder='content' autoComplete='' />
                  <ErrorMessage name="content" component="div" />
               </Box>
               <Box>
                  <Field as="select" name="category_id" className={styles.inputField}>
                     {categories && categories.map(cat => {
                        return (<option key={cat.id} value={cat.id}>{cat.category}g</option>)
                     })}

                  </Field>
                  <ErrorMessage name="category_id" component="div" />
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
   )
}

