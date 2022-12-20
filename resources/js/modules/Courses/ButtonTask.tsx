import React from 'react'
import Button from '@mui/material/Button'

const buttonsAction = {
   backgroundColor: 'bgmode.main', color: 'fpage.main', borderColor: 'bgmode.main'
}
type ButtonTaskType = {
   fn: () => void
   title: string
   Icon?: JSX.Element
   isDisable?: boolean
}
export const ButtonTask: React.FC<ButtonTaskType> = ({ fn, title, Icon = (<></>), isDisable = false }) => {
   return (
      <Button variant="outlined"
         endIcon={Icon}
         disabled={isDisable}
         sx={buttonsAction}
         onClick={fn}
      >
         {title}
      </Button>
   )
}