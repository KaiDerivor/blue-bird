import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import FormLoyauts from './FormLayouts';
//@ts-ignore
import styles from './style.module.scss'
import Box from '@mui/material/Box'

export const FormLog = () => (
   <FormLoyauts title='Enter' text='There is text' link='/' textLink='Kinkl' >
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
                  <Field type="email" name="email" className={styles.inputField} />
                  <ErrorMessage name="email" component="div" />
               </Box>
               <Box>
                  <Field type="password" name="password" className={styles.inputField} />
                  <ErrorMessage name="password" component="div" />
               </Box>
               <button type="submit" className={styles.buttonSubmit} >
                  Submit
               </button>
            </Form>
            {/* )} */}
         </Formik>
      </div>
   </FormLoyauts>
);

// <Formik
//       initialValues={{
//         firstName: '',
//         lastName: '',
//         email: '',
//       }}
//       onSubmit={async (values) => {
//         await new Promise((r) => setTimeout(r, 500));
//         alert(JSON.stringify(values, null, 2));
//       }}
//     >
//       <Form>
//         <label htmlFor="firstName">First Name</label>
//         <Field id="firstName" name="firstName" placeholder="Jane" />

//         <label htmlFor="lastName">Last Name</label>
//         <Field id="lastName" name="lastName" placeholder="Doe" />

//         <label htmlFor="email">Email</label>
//         <Field
//           id="email"
//           name="email"
//           placeholder="jane@acme.com"
//           type="email"
//         />
//         <button type="submit">Submit</button>
//       </Form>
//     </Formik>