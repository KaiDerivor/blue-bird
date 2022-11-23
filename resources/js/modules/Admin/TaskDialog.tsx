import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box'
import { TaskForm } from './TaskForm';

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
   taskId: number | string
   taskNumber: string
   switchHandler: string
}

export const TaskDialog: React.FC<FormDialogType> = ({ openDilaog, setOpenDialog, taskId, taskNumber, switchHandler }) => {
   const [open, setOpen] = React.useState(false);
   const dispatch: any = useDispatch();

   const [field, setField] = React.useState('')


   const handleConfirm = () => {
      switch (switchHandler) {
         case 'save': {
            // dispatch(createCategory(field))
            break;
         }
         case 'update': {
            // dispatch(updateCategory(taskId, field))
            break;
         }
         case 'delete': {
            // dispatch(deleteCategory(taskId))
            break;
         }
         default: {
            return;
         }

      }
      console.log('sended')
      setField('')
      setOpenDialog(false)
   };

   const handleClose = () => {
      setOpenDialog(false);
   };

   return (
      <div>

         <Dialog
            fullScreen
            open={openDilaog}
            onClose={handleClose}
            TransitionComponent={Transition}
         >
            <AppBar sx={{ position: 'relative' }}>
               <Toolbar>
                  <IconButton
                     edge="start"
                     color="inherit"
                     onClick={handleClose}
                     aria-label="close"
                  >
                     <CloseIcon />
                  </IconButton>
                  <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                     Form Task
                  </Typography>
                  <Button autoFocus color="inherit" onClick={handleConfirm}>
                     save
                  </Button>
               </Toolbar>
            </AppBar>
            <Box sx={{ m: 3 }}>
               <TaskForm />
            </Box>
         </Dialog>
      </div>
   );
}