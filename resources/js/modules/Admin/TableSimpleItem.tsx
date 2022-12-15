import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CategoryRecordType, CategoryType } from '../../redux/catReducer';
import Button from '@mui/material/Button';
import { TagRecordType } from '../../redux/tagReducer';
import { ButtonAddItem } from './ButtonAddItem';
import { DialogFormTags } from './DialogFormTags';
import { DialogFormCategories } from './DialogFormCategories';
import { DialogFormEvents } from './DialogFormEvents';
import { EventRecordType } from '../../redux/eventReducer';

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
   },
   event: (openDilaog, setOpenDialog, itemId, item, handleConfirm, setItem) => {
      return <DialogFormEvents openDilaog={openDilaog}
         setOpenDialog={setOpenDialog}
         itemId={itemId}
         item={item}
         handleConfirm={handleConfirm}
         setItem={setItem}
      />
   }
}
type TableItemsType = {
   list: Array<CategoryType | TagRecordType | EventRecordType>
   setSwitchHandler: (arg1: string) => void
   handleConfirm: (id?: number, field?: CategoryRecordType | TagRecordType | EventRecordType) => void
   typeDialog: string
}
export const TableSimpleItem: React.FC<TableItemsType> = React.memo(({ list, setSwitchHandler, handleConfirm, typeDialog }) => {

   const [openDilaog, setOpenDialog] = useState(false)
   const [itemId, setItemId] = useState<number | undefined>(0)
   const [item, setItem] = useState<CategoryRecordType | TagRecordType | EventRecordType | undefined>(undefined)
   const renderDialogForm = () => {
      switch (typeDialog) {
         case "TAG": {
            return dilaogForms.tag(openDilaog, setOpenDialog, itemId, item, handleConfirm, setItem);
         }
         case 'CATEGORY': {
            return dilaogForms.category(openDilaog, setOpenDialog, itemId, item, handleConfirm, setItem)
         }
         case 'EVENT': {
            return dilaogForms.event(openDilaog, setOpenDialog, itemId, item, handleConfirm, setItem)
         }
         default: return 'Type of dialog form not found';
      }
   }
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
                           {//@ts-ignore
                              row?.textUrl && row.textUrl}
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
         {renderDialogForm()}
      </>
   );
})
