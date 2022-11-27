import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { UserRecordType } from '../../redux/userReducer';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import Box from '@mui/material/Box'
//@ts-ignore
import styles from './style.module.scss'
import Typography from '@mui/material/Typography';
import { ButtonSubmit } from '../Auth/ButtonSubmit';
import { SearchBarUser } from './SearchBarUser';

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
   setSwitchHandler: (arg1: string) => void
   handleConfirm: (id?: number | string, user?: UserRecordType) => void
}
export const TableUsers: React.FC<TableUsersType> = ({ list, setSwitchHandler, handleConfirm }) => {

   const [openDilaog, setOpenDialog] = useState(false)
   const [userId, setUserId] = useState<number | string | undefined>(0)
   const [user, setUser] = useState<UserRecordType>({})

   return (
      <>
         <Box sx={{p:2}}>
            <SearchBarUser />
         </Box>
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
                           <Button onClick={() => { setSwitchHandler('update'); setUser(row); setUserId(row.id); setOpenDialog(true) }}>
                              Update
                           </Button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => { setSwitchHandler('delete'); setUser({}); setUserId(row.id); setOpenDialog(true) }}>
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


type FormDialogType = {
   openDilaog: boolean
   setOpenDialog: (arg1: boolean) => void
   userId: number | string | undefined
   user: UserRecordType
   handleConfirm: (id?: number | string, user?: UserRecordType) => void
}
const FormDialog: React.FC<FormDialogType> = ({ openDilaog, setOpenDialog, userId, user, handleConfirm }) => {
   const [error, setError] = useState('')

   const handleCloseForm = () => {
      setOpenDialog(false);
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
                     name: user?.name ? user.name : '',
                     email: user?.email ? user.email : '',
                     role: user?.role ? user.role : ''
                  }}
                  onSubmit={(values) => {
                     //@ts-ignore
                     let formData = { ...values }
                     if (!formData.name) {
                        setError('Name field is required')
                        return;
                     }
                     if (!formData.email) {
                        setError('Email field is required')
                        return;
                     }
                     handleConfirm(userId, formData)
                     setOpenDialog(false)
                  }}
               >
                  <Form className={styles.forms}>
                     <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>

                        <Box className={styles.wrapperField}>
                           <Field type="text" name="name" className={styles.inputField}
                              placeholder="name" autoComplete='' />
                           <ErrorMessage name="name" component="div" />
                        </Box>
                        <Box className={styles.wrapperField}>
                           <Field type="email" name="email" className={styles.inputField}
                              placeholder="email" autoComplete='' />
                           <ErrorMessage name="email" component="div" />
                        </Box>
                     </Box>
                     <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '20px' }}>
                        <Box className={styles.wrapperField}>
                           <Field as="select" name="role" className={styles.inputField}>
                              <option value='user'>user</option>
                              <option value='admin'>admin</option>
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
            </DialogActions>
         </Dialog>
      </div >
   );
}