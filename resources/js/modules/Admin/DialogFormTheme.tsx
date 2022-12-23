import React, { useState } from 'react';
import { CategoryRecordType } from '../../redux/catReducer';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TagRecordType } from '../../redux/tagReducer';
import { Formik, Field, Form } from 'formik';
//@ts-ignore
import styles from './style.module.scss'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ButtonSubmit } from '../Auth/ButtonSubmit';
import { EventRecordType } from '../../redux/eventReducer';
import { useSelector } from 'react-redux';
import { getCategories } from '../../redux/appSelector';
import { ThemeRecordType } from '../../redux/themeReducer';

type DialogFormThemeType = {
   openDilaog: boolean
   setOpenDialog: (arg1: boolean) => void
   itemId: number | undefined
   item?: ThemeRecordType
   handleConfirm: (id?: number, item?: ThemeRecordType) => void
   setItem: (arg1: undefined) => void
}
export const DialogFormTheme: React.FC<DialogFormThemeType> = ({ openDilaog, setOpenDialog, itemId, item, handleConfirm, setItem }) => {


   const [error, setError] = useState('')

   const categories = useSelector(getCategories)

   const handleCloseForm = () => {
      setOpenDialog(false);
   };

   const handleConfirmForm = (formData) => {
      handleConfirm(itemId, formData);
      setOpenDialog(false)
      setItem(undefined)
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
                     title: item?.title ? item.title : '',
                     description: item?.description ? item.description : '',
                     category_id: item?.categoryId ? item.categoryId : '',
                     numberOfTheme: item?.numberOfTheme ? item.numberOfTheme : '',
                     textUrl: item?.textUrl ? item.textUrl : '',
                     

                  }}
                  onSubmit={(values) => {
                     let formData = { ...values }
                     if (!formData.title) {
                        setError('Set title')
                        return;
                     }
                     for (const key in formData) {
                        if (Object.prototype.hasOwnProperty.call(formData, key)) {

                           if (!formData[key]) {
                              delete formData[key]
                           }
                        }
                     }
                     handleConfirmForm(formData)
                  }}
               >
                  <Form className={styles.forms}>


                     <Box className={styles.wrapperField}>

                     </Box>
                     <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>

                        <Box className={styles.wrapperField}>
                           <Field type='text' name="title" className={styles.inputField}
                              placeholder="title" autoComplete='' />
                        </Box>
                        <Box className={styles.wrapperField}>
                           <Field type='text' name="textUrl" className={styles.inputField}
                              placeholder="theme-" autoComplete='' />
                        </Box>
                        <Box className={styles.wrapperField}>
                           <Field type='text' name="description" className={styles.inputField}
                              placeholder="description" autoComplete='' />
                        </Box>
                     </Box>

                     <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>
                        <Box className={styles.wrapperField}>
                           <Field as="select" name="category_id" className={styles.inputField}>
                              <option value=''></option>
                              {categories && categories.map(cat => {
                                 return (<option key={cat.id} value={cat.id}>{cat.title}</option>)
                              })}
                           </Field>
                        </Box>
                        <Box className={styles.wrapperField}>
                        <Field type='number' name="numberOfTheme" className={styles.inputField}
                              placeholder="2" autoComplete='' />
                        </Box>
                     </Box>
                     <Typography variant="body1" color="error">{error}</Typography>
                     <ButtonSubmit text='Відправити' />
                  </Form>
               </Formik>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCloseForm}>Cancel</Button>
               <Button onClick={handleConfirmForm}>Confirm</Button>
            </DialogActions>
         </Dialog>
      </div >
   );
}