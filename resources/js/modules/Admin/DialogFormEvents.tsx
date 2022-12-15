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

type DialogFormTagsType = {
   openDilaog: boolean
   setOpenDialog: (arg1: boolean) => void
   itemId: number | undefined
   item?: EventRecordType
   handleConfirm: (id?: number, item?: EventRecordType) => void
   setItem: (arg1: CategoryRecordType | TagRecordType | undefined) => void
}
export const DialogFormEvents: React.FC<DialogFormTagsType> = ({ openDilaog, setOpenDialog, itemId, item, handleConfirm, setItem }) => {


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
                     eventType: item?.eventType ? item.eventType : 'zno',
                     time: item?.time ? item.time : '',
                     categoryId: item?.categoryId ? item.categoryId : '',

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
                           <Field type='text' name="time" className={styles.inputField}
                              placeholder="09.12.2022" autoComplete='' />
                        </Box>
                        <Box className={styles.wrapperField}>
                           <Field type='text' name="description" className={styles.inputField}
                              placeholder="description" autoComplete='' />
                        </Box>
                     </Box>

                     <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>
                        <Box className={styles.wrapperField}>
                           <Field as="select" name="categoryId" className={styles.inputField}>
                              <option value=''></option>
                              {categories && categories.map(cat => {
                                 return (<option key={cat.id} value={cat.id}>{cat.title}</option>)
                              })}
                           </Field>
                        </Box>
                        <Box className={styles.wrapperField}>
                           <Field as="select" name="eventType" className={styles.inputField}>
                              <option value='zno'>zno</option>
                              <option value='update'>update</option>
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
               <Button onClick={handleConfirmForm}>Confirm</Button>
            </DialogActions>
         </Dialog>
      </div >
   );
}