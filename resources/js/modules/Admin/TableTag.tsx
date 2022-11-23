import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { Collapse } from '@mui/material';
import { createTag, deleteTag, TagRecordType, updateTag } from '../../redux/tagReducer';

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



type TableTagType = {
   list: Array<TagRecordType>
}
export const TableTag:React.FC<TableTagType> = ({ list }) => {
   const [openDilaog, setOpenDialog] = useState(false)
   const [tagId, setTagId] = useState<string|number>(0)
   const [tagText, setTagText] = useState('')
   const [switchHandler, setSwitchHandler] = useState('save')
   return (
      <>
         <Button variant="outlined"
            endIcon={<AddIcon />}
            sx={{ color: 'fpage.main', borderColor: 'bgmode.dark', mt: 3, mb: 2 }}
            onClick={() => {
               setSwitchHandler('save');
               setOpenDialog(true);
            }}
         >
            Add
         </Button>
         <TableContainer component={Paper}>
            <Table aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>#id</StyledTableCell>
                     <StyledTableCell align="right">Tag</StyledTableCell>
                     <StyledTableCell align="right">Actions</StyledTableCell>
                     <StyledTableCell align="right"></StyledTableCell>
                     <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {list && list.map((row) => (
                     <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                           #{row.id}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.tag}</StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler('update'); setTagText(row.tag); setTagId(row.id); setOpenDialog(true) }}
                           >Update</Button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler('delete'); setTagText(''); setTagId(row.id); setOpenDialog(true) }}
                           >Delete</Button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                        </StyledTableCell>
                     </StyledTableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>

         <FormDialog
            openDilaog={openDilaog}
            setOpenDialog={setOpenDialog}
            tagId={tagId}
            tagText={tagText}
            switchHandler={switchHandler}
         />
      </>
   );
}


type FormDialogType = {
   openDilaog: boolean
   setOpenDialog: (arg1: boolean) => void
   tagId: number|string
   tagText: string
   switchHandler: string
}
const FormDialog: React.FC<FormDialogType> = ({ openDilaog, setOpenDialog, tagId, tagText, switchHandler }) => {

   const dispatch: any = useDispatch();

   const [field, setField] = useState('')

   const handleClose = () => {
      setOpenDialog(false);
   };

   const handleConfirm = () => {
      switch (switchHandler) {
         case 'save': {
            dispatch(createTag(field))
            break;
         }
         case 'update': {
            dispatch(updateTag(tagId, field))
            break;
         }
         case 'delete': {
            dispatch(deleteTag(tagId))
            break;
         }
         default: {
            return;
         }

      }
      setField('')
      setOpenDialog(false)
   };
   return (
      <div>

         <Dialog open={openDilaog} onClose={handleClose}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogContent>
               <DialogContentText>
                  Confirm action
               </DialogContentText>
               <Collapse in={switchHandler !== 'delete'}>
                  <TextField
                     margin="dense"
                     id="name"
                     label="Tag text"
                     type="text"
                     fullWidth
                     variant="standard"
                     autoFocus
                     defaultValue={tagText}
                     onChange={(el => setField(el.target.value))}
                  />
               </Collapse>
            </DialogContent>
            <DialogActions>
               <Button onClick={handleClose}>Cancel</Button>
               <Button onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
         </Dialog>
      </div >
   );
}