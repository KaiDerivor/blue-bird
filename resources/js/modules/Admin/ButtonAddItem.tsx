import React from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';

type ButtonAddItemType = {
   setSwitchHandler: (arg1: string) => void
   setOpenDialog: (arg1: boolean) => void
}
export const ButtonAddItem: React.FC<ButtonAddItemType> = ({ setSwitchHandler, setOpenDialog }) => {

   return (
      <Button variant="outlined"
         endIcon={<AddIcon />}
         sx={{ color: 'fpage.main', borderColor: 'bgmode.dark', mt: 3, mb: 2 }}
         onClick={() => {
            setSwitchHandler('save');
            setOpenDialog(true);
         }}
      >
         Add Item
      </Button>
   )
}