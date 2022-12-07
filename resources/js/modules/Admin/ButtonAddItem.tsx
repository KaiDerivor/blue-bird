import React from 'react'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add';

type ButtonAddItemType = {
   setSwitchHandler: (arg1: string) => void
   setOpenDialog: (arg1: boolean) => void
   setItem?: (arg1: any) => void
}
export const ButtonAddItem: React.FC<ButtonAddItemType> = ({ setSwitchHandler, setOpenDialog, setItem }) => {

   return (
      <Button variant="outlined"
         endIcon={<AddIcon />}
         sx={{ color: 'fpage.main', borderColor: 'bgmode.dark', mt: 3, mb: 2 }}
         onClick={() => {
            setSwitchHandler('save');
            setOpenDialog(true);
            setItem && setItem({})
         }}
      >
         Add Item
      </Button>
   )
}