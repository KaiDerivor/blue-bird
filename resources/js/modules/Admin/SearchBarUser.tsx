import React, { useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField'
import { getUsersInit } from '../../redux/userReducer';



export const SearchBarUser: React.FC = () => {
   const dispatch: AppDispatch = useDispatch();
   const [nameField, setNameField] = useState('')
   const [emailField, setEmailField] = useState('')
   const [role, setRole] = useState('')

   const onSearch = () => {
      //@ts-ignore
      dispatch(getUsersInit(nameField, emailField,role))
   }

   return (
      <Box sx={{ pb: 2 }}>
         <Typography variant="subtitle2" color="fpage.main" sx={{ mb: 2 }}>Filters</Typography>
         <Box sx={{ display: 'flex', gap: '20px', pb: 2, flexWrap: 'wrap' }}>
            <TextField id="name" label="Name" variant="standard" fullWidth
               onChange={(el) => { setNameField(el.target.value) }}
            />
            <TextField id="email" label="Email" variant="standard" fullWidth
               onChange={(el) => { setEmailField(el.target.value) }}
            />

            <FormControl fullWidth>
               <InputLabel id="select-label-category">Category</InputLabel>
               <Select
                  labelId="select-role"
                  id="role"
                  value={role}
                  label="Role"
                  onChange={(el) => setRole(el.target.value)}
               >
                  <MenuItem value="">Choose role</MenuItem>
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
               </Select>
            </FormControl>

         </Box>
         <Button variant="outlined" color="secondary"
            onClick={onSearch}
         >
            Search
         </Button>
      </Box>

   )
}