import React, { useState } from 'react'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CategoryRecordType } from '../../redux/catReducer';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { getTasksInit } from '../../redux/taskReducer';


type SearchBarTaskType = {
   categories: Array<CategoryRecordType>
   tags: Array<CategoryRecordType>
}

export const SearchBarTask: React.FC<SearchBarTaskType> = ({ categories, tags }) => {
   const dispatch: AppDispatch = useDispatch();
   const [categoryField, setCategoryField] = useState('')
   const [tagField, setTagField] = useState('')

   const onSearch = () => {
      //@ts-ignore
      dispatch(getTasksInit(categoryField, tagField))
   }
   if (!categories && !tags) {
      return <div>Loading...</div>
   }
   return (
      <Box sx={{ pb: 2 }}>
         <Typography variant="subtitle2" color="fpage.main" sx={{ mb: 2 }}>Filters</Typography>
         <Box sx={{ display: 'flex', gap: '20px', pb: 2 }}>

            <FormControl fullWidth>
               <InputLabel id="select-label-category">Category</InputLabel>
               <Select
                  labelId="select-category"
                  id="select-category-id"
                  value={categoryField}
                  label="Category"
                  onChange={(el) => setCategoryField(el.target.value)}
               >
                  <MenuItem value="">Choose category</MenuItem>

                  {categories.map(category => {
                     return <MenuItem key={category.id} value={category.id}>{category.title}</MenuItem>
                  })}

               </Select>
            </FormControl>
            <FormControl fullWidth>
               <InputLabel id="select-label-tag">Tag</InputLabel>
               <Select
                  labelId="select-tag"
                  id="select-tag-id"
                  value={tagField}
                  label="Tag"
                  onChange={(el) => setTagField(el.target.value)}
               >
                  <MenuItem value="">Choose tag</MenuItem>

                  {tags.map(tag => {
                     return <MenuItem key={tag.id} value={tag.id}>{tag.title}</MenuItem>
                  })}

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