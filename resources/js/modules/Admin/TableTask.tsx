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
import { TaskRecordType } from '../../redux/taskReducer';
import { TaskDialog } from './DialogFormTask';
import { TagRecordType } from '../../redux/tagReducer';
import { ButtonAddItem } from './ButtonAddItem';
import { ACTION_OF_CRUD, DELETE, UPDATE } from '../../redux/appReducer';

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

type TableTaskType = {
   list: Array<TaskRecordType>
   categories: Array<CategoryRecordType>
   tags: Array<TagRecordType>
   setSwitchHandler: (arg1: ACTION_OF_CRUD) => void
   handleConfirm: (id?: number | string, field?: TaskRecordType) => void
   switchHandler: ACTION_OF_CRUD
}
export const TableTask: React.FC<TableTaskType> = ({ list, categories, tags, setSwitchHandler, handleConfirm, switchHandler }) => {

   const [openDilaog, setOpenDialog] = useState(false)
   const [task, setTask] = useState<TaskRecordType>({})
   const [idTask, setIdTask] = useState<number | string>('')
   const [isDeleteConfirm, setIsDeleteConfirm] = useState(false)



   const detectCategory = (id: string | undefined) => {
      let item = categories.filter(el => `${el.id}` === `${id}`);
      if (item[0]?.title) {
         return item[0].title;

      } else {
         return ''
      }
   }
   const detectTag = (id: string | undefined) => {
      let item = tags.filter(el => `${el.id}` === `${id}`);
      if (item[0]?.title) {
         return item[0].title;

      } else {
         return ''
      }
   }
   return (
      <>
         <ButtonAddItem setSwitchHandler={setSwitchHandler} setOpenDialog={setOpenDialog} setItem={setTask} />
         <TableContainer component={Paper}>
            <Table aria-label="customized table">
               <TableHead>
                  <TableRow>
                     <StyledTableCell>#id</StyledTableCell>
                     <StyledTableCell align="right">number_of_task</StyledTableCell>
                     <StyledTableCell align="right">Category</StyledTableCell>
                     <StyledTableCell align="right">Tag</StyledTableCell>
                     <StyledTableCell align="right">Actions</StyledTableCell>
                     <StyledTableCell align="right"></StyledTableCell>
                  </TableRow>
               </TableHead>
               <TableBody>

                  {(list && categories && tags) && list.map((row) => (
                     <StyledTableRow key={row.id}>
                        <StyledTableCell component="th" scope="row">
                           #{row.id}
                        </StyledTableCell>
                        <StyledTableCell component="th" align="right">
                           {row.number_of_task}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <div>
                              {detectCategory(row.category_id)}
                           </div>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <div>
                              {detectTag(row.tag_id)}
                           </div>
                        </StyledTableCell>

                        <StyledTableCell align="right">
                           <Button onClick={() => {
                              setSwitchHandler(UPDATE); setTask(row);
                              if (row.id) {
                                 setIdTask(row.id);
                              }
                              setOpenDialog(true)
                           }}
                           >Update</Button>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                           <Button onClick={() => {
                              setSwitchHandler(DELETE);
                              if (row.id) {
                                 setIdTask(row.id);
                              }
                              setIsDeleteConfirm(true)
                              setOpenDialog(true)
                           }}
                           >Delete</Button>
                        </StyledTableCell>

                     </StyledTableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>

         <TaskDialog
            openDilaog={openDilaog}
            setOpenDialog={setOpenDialog}
            task={task}
            idTask={idTask}
            handleConfirm={handleConfirm}
            isDeleteConfirm={isDeleteConfirm}
            switchHandler={switchHandler}
         />
      </>
   );
}




