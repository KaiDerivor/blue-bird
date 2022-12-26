import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Box from '@mui/material/Box'
import { TaskForm } from './TaskForm';
import { TaskRecordType } from '../../redux/taskReducer';
import { ACTION_OF_CRUD, DELETE } from '../../redux/appReducer';

const Transition = React.forwardRef(function Transition(
   props: TransitionProps & {
      children: React.ReactElement;
   },
   ref: React.Ref<unknown>,
) {
   return <Slide direction="up" ref={ref} {...props} />;
});


type FormDialogType = {
   openDilaog: boolean
   setOpenDialog: (arg1: boolean) => void
   handleConfirm: (id?: number | string, field?: TaskRecordType) => void
   idTask: string | number
   task: TaskRecordType
   isDeleteConfirm: boolean
   switchHandler: ACTION_OF_CRUD
}

export const TaskDialog: React.FC<FormDialogType> = ({ openDilaog, setOpenDialog, idTask = '', task = {}, handleConfirm, isDeleteConfirm, switchHandler }) => {

   const handleConfirmForm = (taskItem: TaskRecordType = {}) => {
      handleConfirm(idTask, taskItem)
      setOpenDialog(false);
   };

   const handleCloseForm = () => {
      setOpenDialog(false);
   };

   if (isDeleteConfirm) {
      return <DialogConfirm handleClose={handleCloseForm} handleConfirm={handleConfirmForm} openDilaog={openDilaog} />
   }
   return (
      <div>

         <Dialog
            fullScreen
            open={openDilaog}
            onClose={handleCloseForm}
            TransitionComponent={Transition}
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
            {switchHandler !== DELETE &&
               <Box sx={{ m: 3 }}>
                  <TaskForm handleConfirm={handleConfirmForm} task={task} />
               </Box>
            }
         </Dialog>
      </div>
   );
}
type DialogConfirm = {
   openDilaog: boolean
   handleClose: () => void
   handleConfirm: () => void
}
const DialogConfirm: React.FC<DialogConfirm> = ({ openDilaog, handleClose, handleConfirm }) => {
   return (
      <Dialog open={openDilaog} onClose={handleClose}>
         <DialogTitle>Are you sure?</DialogTitle>
         <DialogContent>
            <DialogContentText>
               Confirm delete
            </DialogContentText>

         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
         </DialogActions>
      </Dialog>
   )
}