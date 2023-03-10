import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Formik, Field, Form } from 'formik';
//@ts-ignore
import styles from './style.module.scss'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ButtonSubmit } from '../Auth/ButtonSubmit';
import { useSelector } from 'react-redux';
import { getCategories } from '../../redux/appSelector';
import { RuleRecordType } from '../../redux/ruleReducer';
import { ACTION_OF_CRUD, DELETE } from '../../redux/appReducer';

type DialogFormRuleType = {
   openDilaog: boolean
   setOpenDialog: (arg1: boolean) => void
   itemId: number | undefined
   item?: RuleRecordType
   handleConfirm: (id?: number, item?: RuleRecordType) => void
   setItem: (arg1: undefined) => void
   switchHandler: ACTION_OF_CRUD
}
export const DialogFormRule: React.FC<DialogFormRuleType> = ({ openDilaog, setOpenDialog, itemId, item, handleConfirm, setItem, switchHandler }) => {


   const [error, setError] = useState('')

   const categories = useSelector(getCategories)

   const handleCloseForm = () => {
      setOpenDialog(false);
   };

   const handleConfirmForm = (formData?: RuleRecordType) => {
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
               {switchHandler !== DELETE &&
                  <Formik
                     initialValues={{
                        title: item?.title ? item.title : '',
                        description: item?.description ? item.description : '',
                        category_id: item?.categoryId ? item.categoryId : '',

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
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>
                           <Box className={styles.wrapperField}>
                           <Typography variant="caption" color="inherit">Title</Typography>
                              <Field type='text' name="title" className={styles.inputField}
                                 placeholder="title" autoComplete='' />
                           </Box>
                           <Box className={styles.wrapperField}>
                           <Typography variant="caption" color="inherit">Description</Typography>
                              <Field type='text' name="description" className={styles.inputField}
                                 placeholder="description" autoComplete='' />
                           </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>
                           <Box className={styles.wrapperField}>
                           <Typography variant="caption" color="inherit">Select category</Typography>
                              <Field as="select" name="category_id" className={styles.inputField}>
                                 <option value=''></option>
                                 {categories && categories.map(cat => {
                                    return (<option key={cat.id} value={cat.id}>{cat.title}</option>)
                                 })}
                              </Field>
                           </Box>
                        </Box>
                        <Typography variant="body1" color="error">{error}</Typography>
                        <ButtonSubmit text='????????????????????' />
                     </Form>
                  </Formik>
               }
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCloseForm}>Cancel</Button>
               {switchHandler === DELETE && <Button onClick={() => handleConfirmForm()}>Confirm</Button>}
            </DialogActions>
         </Dialog>
      </div >
   );
}