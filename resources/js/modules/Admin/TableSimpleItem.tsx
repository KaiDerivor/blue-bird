import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CategoryRecordType } from '../../redux/catReducer';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TagRecordType } from '../../redux/tagReducer';
import { ButtonAddItem } from './ButtonAddItem';
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
import { DialogFormTags } from './DialogFormTags';
import { DialogFormCategories } from './DialogFormCategories';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
   },
   [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
   },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
   '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
   },
   // hide last border
   '&:last-child td, &:last-child th': {
      border: 0,
   },
}));
const dilaogForms = {
   tag: (openDilaog, setOpenDialog, itemId, item, handleConfirm, setItem) => {
      return <DialogFormTags
         openDilaog={openDilaog}
         setOpenDialog={setOpenDialog}
         itemId={itemId}
         item={item}
         handleConfirm={handleConfirm}
         setItem={setItem}
      />
   },
   category: (openDilaog, setOpenDialog, itemId, item, handleConfirm, setItem) => {
      return <DialogFormCategories
         openDilaog={openDilaog}
         setOpenDialog={setOpenDialog}
         itemId={itemId}
         item={item}
         handleConfirm={handleConfirm}
         setItem={setItem}
      />
   }
}
type TableItemsType = {
   list: Array<CategoryRecordType | TagRecordType>
   setSwitchHandler: (arg1: string) => void
   handleConfirm: (id?: number, field?: CategoryRecordType | TagRecordType) => void
   typeDialog: string
}
export const TableSimpleItem: React.FC<TableItemsType> = ({ list, setSwitchHandler, handleConfirm, typeDialog }) => {

   const [openDilaog, setOpenDialog] = useState(false)
   const [itemId, setItemId] = useState<number | undefined>(0)
   const [item, setItem] = useState<CategoryRecordType | TagRecordType | undefined>(undefined)
   // console.log(list)
   return (
      <>
         <ButtonAddItem setOpenDialog={setOpenDialog} setSwitchHandler={setSwitchHandler} />
         <TableContainer component={Paper}>
            <Table aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>#id</StyledTableCell>
                     <StyledTableCell align="right">Title</StyledTableCell>
                     <StyledTableCell align="right">Description</StyledTableCell>
                     <StyledTableCell align="right">textUrl</StyledTableCell>

                     <StyledTableCell align="right">Actions</StyledTableCell>
                     <StyledTableCell align="right"></StyledTableCell>

                  </TableRow>
               </TableHead>
               <TableBody>
                  {list && list.map((row) => (
                     <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                           #{row.id}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           {row.title}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           {row.description}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           {row.textUrl}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler('update'); setItem(row); setItemId(row.id); setOpenDialog(true) }}>
                              Update
                           </Button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler('delete'); setItem(undefined); setItemId(row.id); setOpenDialog(true) }}>
                              Delete
                           </Button>
                        </StyledTableCell>

                     </StyledTableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         {typeDialog === 'TAG'
            ? dilaogForms.tag(openDilaog, setOpenDialog, itemId, item, handleConfirm, setItem)
            : dilaogForms.category(openDilaog, setOpenDialog, itemId, item, handleConfirm, setItem)}

      </>
   );
}


// type FormDialogType = {
//    openDilaog: boolean
//    setOpenDialog: (arg1: boolean) => void
//    itemId: number | undefined
//    item?: CategoryRecordType | TagRecordType
//    handleConfirm: (id?: number, item?: TagRecordType | CategoryRecordType) => void
//    setItem: (arg1: CategoryRecordType | TagRecordType | undefined) => void
// }
// const FormDialog: React.FC<FormDialogType> = ({ openDilaog, setOpenDialog, itemId, item, handleConfirm, setItem }) => {


//    const [error, setError] = useState('')
//    const [img, setImg] = useState({ name: '' })

//    const handleCloseForm = () => {
//       setOpenDialog(false);
//    };

//    const handleConfirmForm = (formData) => {
//       handleConfirm(itemId, formData);
//       setOpenDialog(false)
//       setItem(undefined)
//       setImg({ name: '' })
//    };
//    return (
//       <div>

//          <Dialog open={openDilaog} onClose={handleCloseForm}>
//             <DialogTitle>Are you sure?</DialogTitle>
//             <DialogContent>
//                <DialogContentText>
//                   Confirm action
//                </DialogContentText>
//                <Formik
//                   initialValues={{
//                      title: item?.title ? item.title : '',
//                      description: item?.description ? item.description : '',

//                      textUrl: item?.textUrl ? item.textUrl : '',
//                   }}
//                   onSubmit={(values) => {
//                      //@ts-ignore
//                      let formData = { ...values, img }
//                      if (!formData.title) {
//                         setError('Set title')
//                         return;
//                      }
//                      if (!formData.textUrl) {
//                         setError('Fill url')
//                         return;
//                      }
//                      handleConfirmForm(formData)
//                   }}
//                >
//                   <Form className={styles.forms}>

//                      <Box className={styles.wrapperField}>
//                         {item?.img && <img src={`${URL_STORAGE}${item?.img}`} />}
//                      </Box>
//                      <Box className={styles.wrapperField}>
//                         <Stack direction="row" alignItems="center" spacing={2}>
//                            <div>

//                               <Button variant="contained" component="label">
//                                  Upload
//                                  <input hidden multiple type="file" onChange={(el) => {
//                                     //@ts-ignore
//                                     setImg(el.target.files[0])
//                                  }} />
//                               </Button>
//                               <IconButton color="primary" aria-label="upload picture" component="label">

//                                  <input hidden accept="image/*" type="file" onChange={(el) => {
//                                     //@ts-ignore
//                                     setImg(el.target.files[0])
//                                  }}

//                                  />

//                                  <PhotoCamera />
//                               </IconButton>{img.name}
//                            </div>

//                         </Stack>
//                      </Box>
//                      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>

//                         <Box className={styles.wrapperField}>
//                            <Field type='text' name="title" className={styles.inputField}
//                               placeholder="title" autoComplete='' />
//                         </Box>
//                         <Box className={styles.wrapperField}>
//                            <Field type='text' name="description" className={styles.inputField}
//                               placeholder="description" autoComplete='' />
//                         </Box>
//                      </Box>

//                      <Box className={styles.wrapperField}>
//                         <Field type="text" name="textUrl" className={styles.inputField}
//                            placeholder='textUrl' autoComplete='' />
//                      </Box>
//                      <Typography variant="body1" color="error">{error}</Typography>
//                      <ButtonSubmit text='Відправити' />
//                   </Form>
//                </Formik>
//             </DialogContent>
//             <DialogActions>
//                <Button onClick={handleCloseForm}>Cancel</Button>
//                <Button onClick={handleConfirmForm}>Confirm</Button>
//             </DialogActions>
//          </Dialog>
//       </div >
//    );
// }