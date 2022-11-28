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
import { URL_STORAGE } from '../../redux/appReducer';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography'
import { ButtonSubmit } from '../Auth/ButtonSubmit';

type DialogFormTagsType = {
   openDilaog: boolean
   setOpenDialog: (arg1: boolean) => void
   itemId: number | undefined
   item?: CategoryRecordType | TagRecordType
   handleConfirm: (id?: number, item?: TagRecordType | CategoryRecordType) => void
   setItem: (arg1: CategoryRecordType | TagRecordType | undefined) => void
}
export const DialogFormTags: React.FC<DialogFormTagsType> = ({ openDilaog, setOpenDialog, itemId, item, handleConfirm, setItem }) => {


   const [error, setError] = useState('')
   const [img, setImg] = useState({ name: '' })

   const handleCloseForm = () => {
      setOpenDialog(false);
   };

   const handleConfirmForm = (formData) => {
      handleConfirm(itemId, formData);
      setOpenDialog(false)
      setItem(undefined)
      setImg({ name: '' })
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

                     textUrl: item?.textUrl ? item.textUrl : '',
                  }}
                  onSubmit={(values) => {
                     //@ts-ignore
                     let formData = { ...values, img }
                     if (!formData.title) {
                        setError('Set title')
                        return;
                     }
                     if (!formData.textUrl) {
                        setError('Fill url')
                        return;
                     }
                     handleConfirmForm(formData)
                  }}
               >
                  <Form className={styles.forms}>

                     <Box className={styles.wrapperField}>
                        {item?.img && <img src={`${URL_STORAGE}${item?.img}`} />}
                     </Box>
                     <Box className={styles.wrapperField}>
                        <Stack direction="row" alignItems="center" spacing={2}>
                           <div>

                              <Button variant="contained" component="label">
                                 Upload
                                 <input hidden multiple type="file" onChange={(el) => {
                                    //@ts-ignore
                                    setImg(el.target.files[0])
                                 }} />
                              </Button>
                              <IconButton color="primary" aria-label="upload picture" component="label">

                                 <input hidden accept="image/*" type="file" onChange={(el) => {
                                    //@ts-ignore
                                    setImg(el.target.files[0])
                                 }}
                                 />
                                 <PhotoCamera />
                              </IconButton>{img.name}
                           </div>

                        </Stack>
                     </Box>
                     <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>

                        <Box className={styles.wrapperField}>
                           <Field type='text' name="title" className={styles.inputField}
                              placeholder="title" autoComplete='' />
                        </Box>
                        <Box className={styles.wrapperField}>
                           <Field type='text' name="description" className={styles.inputField}
                              placeholder="description" autoComplete='' />
                        </Box>
                     </Box>

                     <Box className={styles.wrapperField}>
                        <Field type="text" name="textUrl" className={styles.inputField}
                           placeholder='textUrl' autoComplete='' />
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