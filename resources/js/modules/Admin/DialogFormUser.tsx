import React, { useState } from "react"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ROLE_ADMIN, ROLE_USER, UserRecordType } from '../../redux/userReducer';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import Box from '@mui/material/Box'
//@ts-ignore
import styles from './style.module.scss'
import Typography from '@mui/material/Typography';
import { ButtonSubmit } from '../Auth/ButtonSubmit';
import Button from '@mui/material/Button'


type FormDialogType = {
   openDilaog: boolean
   setOpenDialog: (arg1: boolean) => void
   userId: number | string | undefined
   user: UserRecordType
   handleConfirm: (id?: number | string, user?: UserRecordType) => void
}
export const FormDialog: React.FC<FormDialogType> = ({ openDilaog, setOpenDialog, userId, user, handleConfirm }) => {
   const [error, setError] = useState('')

   const handleCloseForm = () => {
      setOpenDialog(false);
   };


   return (
      <div>

         <Dialog open={openDilaog} onClose={handleCloseForm}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Confirm action
               </DialogContentText>
               <Formik
                  initialValues={{
                     name: user?.name ? user.name : '',
                     email: user?.email ? user.email : '',
                     role: user?.role ? user.role : ''
                  }}
                  onSubmit={(values) => {
                     //@ts-ignore
                     let formData = { ...values }
                     if (!formData.name) {
                        setError('Name field is required')
                        return;
                     }
                     if (!formData.email) {
                        setError('Email field is required')
                        return;
                     }
                     handleConfirm(userId, formData)
                     setOpenDialog(false)
                  }}
               >
                  <Form className={styles.forms}>
                     <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>

                        <Box className={styles.wrapperField}>
                           <Field type="text" name="name" className={styles.inputField}
                              placeholder="name" autoComplete='' />
                           <ErrorMessage name="name" component="div" />
                        </Box>
                        <Box className={styles.wrapperField}>
                           <Field type="email" name="email" className={styles.inputField}
                              placeholder="email" autoComplete='' />
                           <ErrorMessage name="email" component="div" />
                        </Box>
                     </Box>
                     <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>
                        <Box className={styles.wrapperField}>
                           <Field as="select" name="role" className={styles.inputField}>
                              <option value={ROLE_USER}>user</option>
                              <option value={ROLE_ADMIN}>admin</option>
                           </Field>
                        </Box>
                     </Box>

                     <Typography variant="body1" color="error">{error}</Typography>
                     <ButtonSubmit text='Відправити' />
                  </Form>
               </Formik>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCloseForm}>Cancel</Button>
            </DialogActions>
         </Dialog>
      </div >
   );
}