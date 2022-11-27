import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CategoryRecordType, createCategory, deleteCategory, updateCategory } from '../../redux/catReducer';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TagRecordType } from '../../redux/tagReducer';
import { ButtonAddItem } from './ButtonAddItem';

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

type TableItemsType = {
   list: Array<CategoryRecordType | TagRecordType>
   setSwitchHandler: (arg1: string) => void
   handleConfirm: (id?: number | string, field?: string) => void
}
export const TableSimpleItem: React.FC<TableItemsType> = ({ list, setSwitchHandler, handleConfirm }) => {

   const [openDilaog, setOpenDialog] = useState(false)
   const [itemId, setItemId] = useState<number | string>(0)
   const [itemText, setItemText] = useState('')
   
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
                     <StyledTableCell align="right">img</StyledTableCell>

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
                           {row.img}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler('update'); setItemText(row.title); setItemId(row.id); setOpenDialog(true) }}>
                              Update
                           </Button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler('delete'); setItemText(''); setItemId(row.id); setOpenDialog(true) }}>
                              Delete
                           </Button>
                        </StyledTableCell>

                     </StyledTableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>

         <FormDialog
            openDilaog={openDilaog}
            setOpenDialog={setOpenDialog}
            itemId={itemId}
            itemText={itemText}
            handleConfirm={handleConfirm}
         />
      </>
   );
}


type FormDialogType = {
   openDilaog: boolean
   setOpenDialog: (arg1: boolean) => void
   itemId: number | string
   itemText: string
   handleConfirm: (id?: number | string, field?: string) => void
}
const FormDialog: React.FC<FormDialogType> = ({ openDilaog, setOpenDialog, itemId, itemText, handleConfirm }) => {
   const [field, setField] = useState('')


   const handleCloseForm = () => {
      setOpenDialog(false);
   };

   const handleConfirmForm = () => {
      handleConfirm(itemId, field);
      setField('')
      setOpenDialog(false)
   };
   return (
      <div>

         <Dialog open={openDilaog} onClose={handleCloseForm}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Confirm action
               </DialogContentText>
               <TextField
                  margin="dense"
                  id="name"
                  label="Category text"
                  type="text"
                  fullWidth
                  variant="standard"
                  autoFocus
                  defaultValue={itemText}
                  onChange={(el => setField(el.target.value))}
               />
            </DialogContent>
            <DialogActions>
               <Button onClick={handleCloseForm}>Cancel</Button>
               <Button onClick={handleConfirmForm}>Confirm</Button>
            </DialogActions>
         </Dialog>
      </div >
   );
}