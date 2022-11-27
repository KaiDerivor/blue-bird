import React from 'react'
import Button from '@mui/material/Button'

type ButtonSubmitType = {
   text: string
   isSubmitting?:boolean
}
export const ButtonSubmit: React.FC<ButtonSubmitType> = ({ text,isSubmitting=false }) => {
   return (
      <Button type='submit' variant='contained' disabled={isSubmitting}
      sx={{ backgroundColor: 'bgmode.dark', 
      color: 'fpage.main', 
      p:1.2,
      borderRadius:'12px',
      '&:hover': { backgroundColor: 'bgmode.light' } }} 
      >{text}</Button>
   )
}
