import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CategoryTagRecordType, CategoryTagType } from '../../redux/catReducer';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { ButtonAddItem } from './ButtonAddItem';
import { Formik, Field, Form } from 'formik';
//@ts-ignore
import styles from './style.module.scss'
import { ButtonSubmit } from '../Auth/ButtonSubmit';
import { DialogFormTags } from './DialogFormTags';
import { DialogFormCategories } from './DialogFormCategories';
import { getCategories, getTags } from '../../redux/appSelector';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box'
import { SearchBarCategoryTag } from './SearchBarCategoryTag';
import Stack from '@mui/material/Stack'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { URL_STORAGE } from '../../redux/appReducer';

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
   list: Array<CategoryTagType>
   setSwitchHandler: (arg1: string) => void
   handleConfirm: (id?: number, field?: CategoryTagRecordType) => void
   fnSearch: (arg1: string, arg2: string) => void

}
export const TableCategoryTag: React.FC<TableItemsType> = ({ list, setSwitchHandler, handleConfirm, fnSearch }) => {

   const tags = useSelector(getTags)
   const categories = useSelector(getCategories)

   const [openDilaog, setOpenDialog] = useState(false)
   const [itemId, setItemId] = useState<number>(0)
   const [item, setItem] = useState<CategoryTagType>({} as CategoryTagType)

   return (
      <>
         <SearchBarCategoryTag categories={categories} tags={tags} fnSearch={fnSearch} />
         <ButtonAddItem setOpenDialog={setOpenDialog} setSwitchHandler={setSwitchHandler} />
         <TableContainer component={Paper}>
            <Table aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>#id</StyledTableCell>
                     <StyledTableCell align="right">Category</StyledTableCell>
                     <StyledTableCell align="right">Tag</StyledTableCell>
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
                           {row.tag.title}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           {row.category.title}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler('update'); setItem(row); setItemId(row.id); setOpenDialog(true) }}>
                              Update
                           </Button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler('delete'); setItem({} as CategoryTagType); setItemId(row.id); setOpenDialog(true) }}>
                              Delete
                           </Button>
                        </StyledTableCell>

                     </StyledTableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         <ResultDialog
            openDilaog={openDilaog}
            setOpenDialog={setOpenDialog}
            item={item}
            itemId={itemId}
            handleConfirm={handleConfirm}

         // isDeleteConfirm={isDeleteConfirm}
         />
      </>
   );
}
type FormDialogType = {
   openDilaog: boolean
   setOpenDialog: (arg1: boolean) => void
   handleConfirm: (id?: number, field?: CategoryTagRecordType) => void
   itemId: number
   item: CategoryTagType

}
type FileType = {
   name?: string
}
export const ResultDialog: React.FC<FormDialogType> = ({
   openDilaog,
   setOpenDialog,
   itemId,
   item,
   handleConfirm
}) => {
   console.log(item)
   const [table200img, setTable200img] = useState<FileType>({} as FileType)
   const [table12img, setTable12img] = useState<FileType>({} as FileType)
   const handleConfirmForm = (formItem = {} as CategoryTagRecordType) => {
      handleConfirm(itemId, formItem)
      setOpenDialog(false);
   };

   const handleCloseForm = () => {
      setOpenDialog(false);
   };

   return (
      <div>

         <Dialog
            fullScreen
            open={openDilaog}
            onClose={handleCloseForm}
         >

            <AppBar sx={{ position: 'relative' }}>
               <Toolbar>
                  <IconButton
                     edge="start"
                     color="inherit"
                     onClick={handleCloseForm}
                     aria-label="close"
                  >
                     <CloseIcon />
                  </IconButton>
                  <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                     Form Task
                  </Typography>
               </Toolbar>
            </AppBar>
            <Box sx={{ m: 3 }}>
               <div>
                  <Formik
                     initialValues={{
                        maxTime: item?.maxTime ? item.maxTime : '',
                        maxPoints: item?.maxPoints ? item.maxPoints : 0,
                        someInfo: item?.someInfo ? item.someInfo : '',
                     }}
                     onSubmit={(values) => {
                        const formData = {
                           ...values,
                           table200img,
                           table12img
                        } as CategoryTagRecordType
                        console.log(formData)
                        handleConfirmForm(formData)
                     }}
                  >
                     <Form className={styles.forms}>
                        <Box className={styles.wrapperField}>
                           {item.table200img && <img src={`${URL_STORAGE}${item.table200img}`} />}
                           <Stack direction="row" alignItems="center" spacing={2}>
                              <div>

                                 <Button variant="contained" component="label">
                                    Upload
                                    <input hidden multiple type="file" onChange={(el) => {
                                       //@ts-ignore
                                       setTable200img(el.target.files[0])
                                    }} />
                                 </Button>
                                 <IconButton color="primary" aria-label="upload picture" component="label">

                                    <input hidden accept="image/*" type="file" onChange={(el) => {
                                       //@ts-ignore
                                       setTable200img(el.target.files[0])
                                    }}

                                    />
                                    <PhotoCamera />
                                 </IconButton>{table200img?.name}
                              </div>

                           </Stack>
                        </Box>
                        <Box className={styles.wrapperField}>
                           {item.table12img && <img src={`${URL_STORAGE}${item.table12img}`} />}
                           <Stack direction="row" alignItems="center" spacing={2}>
                              <div>

                                 <Button variant="contained" component="label">
                                    Upload
                                    <input hidden multiple type="file" onChange={(el) => {
                                       //@ts-ignore
                                       setTable12img(el.target.files[0])
                                    }} />
                                 </Button>
                                 <IconButton color="primary" aria-label="upload picture" component="label">

                                    <input hidden accept="image/*" type="file" onChange={(el) => {
                                       //@ts-ignore
                                       setTable12img(el.target.files[0])
                                    }}

                                    />
                                    <PhotoCamera />
                                 </IconButton>{table12img?.name}
                              </div>

                           </Stack>
                        </Box>
                        <Box className={styles.wrapperField}>
                           <Field type="number" name="maxTime" className={styles.inputField}
                              placeholder="maxTime" autoComplete='' />
                        </Box>
                        <Box className={styles.wrapperField}>
                           <Field type="number" name="maxPoints" className={styles.inputField}
                              placeholder="maxPoints" autoComplete='' />
                        </Box>
                        <Box className={styles.wrapperField}>
                           <Field as="textarea" rows='10' name="someInfo" className={styles.inputField}
                              placeholder="someInfo" autoComplete='' />
                        </Box>

                        <ButtonSubmit text='Відправити' />
                     </Form>
                  </Formik>
               </div>
            </Box>
         </Dialog>
      </div >
   );
}