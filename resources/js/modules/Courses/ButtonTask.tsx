import React from 'react'
import Button from '@mui/material/Button'

const buttonsAction = {
   backgroundColor: 'bgmode.main', color: 'fpage.main', borderColor: 'bgmode.main'
}
type ButtonTaskType = {
   fn: () => void
   title: string
}
export const ButtonTask: React.FC<ButtonTaskType> = ({ fn, title }) => {
   return (
      <Button variant="outlined"
         sx={buttonsAction}
         onClick={fn}
      >
         {title}
      </Button>
   )
}