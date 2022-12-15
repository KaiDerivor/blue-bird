import React, { useState } from 'react';
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
import { TagRecordType } from '../../redux/tagReducer';
import { ButtonAddItem } from './ButtonAddItem';
import { Formik, Field, Form } from 'formik';
//@ts-ignore
import styles from './style.module.scss'
import { ButtonSubmit } from '../Auth/ButtonSubmit';
import { DialogFormTags } from './DialogFormTags';
import { DialogFormCategories } from './DialogFormCategories';
import { ResultRecordType, ResultTableType } from '../../redux/taskReducer';
import { detectItem } from '../utils/detectCategory';
import { getCategories, getTags } from '../../redux/appSelector';
import { useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box'
import { SearchBarCategoryTag } from './SearchBarCategoryTag';

const default200 = '{\n"0": "100", \n"1": "100", \n"2": "100", \n"3": "100", \n"4": "100", \n"5": "100", \n"6": "100", \n"7": "100", \n"8": "100", \n"9": "100", \n"10": "100", \n"11": "100", \n"12": "100", \n"13": "100", \n"14": "100", \n"15": "100", \n"16": "100", \n"17": "100", \n"18": "100", \n"19": "100", \n"20": "100", \n"21": "100", \n"22": "100", \n"23": "100", \n"24": "100", \n"25": "100", \n"26": "100", \n"27": "100", \n"28": "100", \n"29": "100", \n"30": "100", \n"31": "100", \n"32": "100", \n"33": "100", \n"34": "100", \n"35": "100", \n"36": "100", \n"37": "100", \n"38": "100", \n"39": "100", \n"40": "100", \n"41": "100", \n"42": "100", \n"43": "100", \n"44": "100", \n"45": "100", \n"46": "100", \n"47": "100", \n"48": "100", \n"49": "100", \n"50": "100", \n"51": "100", \n"52": "100", \n"53": "100", \n"54": "100", \n"55": "100", \n"56": "100", \n"57": "100", \n"58": "100", \n"59": "100", \n"60": "100", \n"61": "100", \n"62": "100"\n}'
const default12 = '{\n"1":"1-1", \n"2":"2-2",\n"3":"3-3",\n"4":"4-4",\n"5":"5-5",\n"6":"6-6",\n"7":"7-7",\n"8":"8-8",\n"9":"9-9",\n"10":"10-10",\n"11":"11-11",\n"12":"12-12"\n}'
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
   list: Array<ResultTableType>
   setSwitchHandler: (arg1: string) => void
   handleConfirm: (id?: number, field?: ResultRecordType) => void
   searchFilter: (arg1: string, arg2: string) => void
}
export const TableResults: React.FC<TableItemsType> = ({ list, setSwitchHandler, handleConfirm, searchFilter }) => {

   const tags = useSelector(getTags)
   const categories = useSelector(getCategories)

   const [openDilaog, setOpenDialog] = useState(false)
   const [itemId, setItemId] = useState<number>(0)
   const [item, setItem] = useState<ResultTableType>({} as ResultTableType)

   return (
      <>
         <SearchBarCategoryTag categories={categories} tags={tags} fnSearch={searchFilter} />
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
                           {detectItem(row.category, categories)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           {detectItem(row.tag, tags)}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler('update'); setItem(row); setItemId(row.id); setOpenDialog(true) }}>
                              Update
                           </Button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler('delete'); setItem({} as ResultTableType); setItemId(row.id); setOpenDialog(true) }}>
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
            tags={tags}
            categories={categories}
         // isDeleteConfirm={isDeleteConfirm}
         />
      </>
   );
}
type FormDialogType = {
   openDilaog: boolean
   setOpenDialog: (arg1: boolean) => void
   handleConfirm: (id?: number, field?: ResultRecordType) => void
   itemId: number
   item: ResultTableType
   categories: Array<CategoryRecordType>
   tags: Array<TagRecordType>
   // isDeleteConfirm: boolean
}
export const ResultDialog: React.FC<FormDialogType> = ({
   openDilaog,
   setOpenDialog,
   itemId,
   item = { category: 0, tag: 0, value: JSON.stringify({}) },
   categories,
   tags,
   handleConfirm
}) => {

   const handleConfirmForm = (formItem: ResultRecordType = {} as ResultRecordType) => {
      handleConfirm(itemId, formItem)
      setOpenDialog(false);
   };

   const handleCloseForm = () => {
      setOpenDialog(false);
   };
   // if (isDeleteConfirm) {
   //    return <DialogConfirm handleClose={handleCloseForm} handleConfirm={handleConfirmForm} openDilaog={openDilaog} />
   // }
   // const rende
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
                        category: item?.category ? item.category : 1,
                        tag: item?.tag ? item.tag : 1,
                        //@ts-ignore
                        value200: item?.value ? JSON.stringify(JSON.parse(item.value).value200) : default200,
                        //@ts-ignore
                        value12: item?.value ? JSON.stringify(JSON.parse(item.value).value12) : default12,
                     }}
                     onSubmit={(values) => {
                        let formData = {
                           categoryId: values.category,
                           tagId: values.tag,
                           value: JSON.stringify({
                              value200: { ...JSON.parse(values.value200) },
                              value12: { ...JSON.parse(values.value12) }
                           })
                        }
                        handleConfirmForm(formData)
                     }}
                  >
                     <Form className={styles.forms}>



                        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>
                           <Box className={styles.wrapperField}>
                              <Field as="select" name="category" className={styles.inputField}>
                                 {categories && categories.map(cat => {
                                    return (<option key={cat.id} value={cat.id}>{cat.title}</option>)
                                 })}
                              </Field>
                           </Box>
                           <Box className={styles.wrapperField}>
                              <Field as="select" name="tag" className={styles.inputField}>
                                 {tags && tags.map(tag => {
                                    return (<option key={tag.id} value={tag.id}>{tag.title}</option>)
                                 })}
                              </Field>
                           </Box>
                        </Box>
                        <Box className={styles.wrapperField}>
                           <Field as="textarea" rows='10' name="value200" className={styles.inputField}
                              placeholder="" autoComplete='' />
                        </Box>
                        <Box className={styles.wrapperField}>
                           <Field as="textarea" rows='10' name="value12" className={styles.inputField}
                              placeholder="" autoComplete='' />
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