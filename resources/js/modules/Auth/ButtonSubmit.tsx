import React from 'react'
import Button from '@mui/material/Button'

type ButtonSubmitType = {
   text: string
}
export const ButtonSubmit: React.FC<ButtonSubmitType> = ({ text }) => {
   return (
      <Button variant='contained' 
      sx={{ backgroundColor: 'bgmode.dark', 
      color: 'fpage.main', 
      p:1.2,
      borderRadius:'12px',
      '&:hover': { backgroundColor: 'bgmode.light' } }} 
      >{text}</Button>
   )
}
