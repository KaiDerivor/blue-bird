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
import { UserRecordType } from '../../redux/userReducer';

import { ACTION_OF_CRUD, DELETE, UPDATE } from '../../redux/appReducer';
import { FormDialog } from './DialogFormUser';

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

type TableUsersType = {
   list: Array<UserRecordType>
   setSwitchHandler: (arg1: ACTION_OF_CRUD) => void
   handleConfirm: (id?: number | string, user?: UserRecordType) => void
   switchHandler: ACTION_OF_CRUD
}
export const TableUsers: React.FC<TableUsersType> = ({ list, setSwitchHandler, handleConfirm, switchHandler }) => {

   const [openDilaog, setOpenDialog] = useState(false)
   const [userId, setUserId] = useState<number | string | undefined>(0)
   const [user, setUser] = useState<UserRecordType>({})

   return (
      <>
        
         <TableContainer component={Paper}>
            <Table aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>#id</StyledTableCell>
                     <StyledTableCell align="right">Name</StyledTableCell>
                     <StyledTableCell align="right">Email</StyledTableCell>
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
                           {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           {row.email}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           {row.role}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler(UPDATE); setUser(row); setUserId(row.id); setOpenDialog(true) }}>
                              Update
                           </Button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler(DELETE); setUser({}); setUserId(row.id); setOpenDialog(true) }}>
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
            userId={userId}
            user={user}
            handleConfirm={handleConfirm}
         />
      </>
   );
}


