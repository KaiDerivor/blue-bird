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
import { useDispatch, useSelector } from 'react-redux';
import { getTaskFilter } from '../../redux/appSelector';


type SearchBarTaskType = {
   categories: Array<CategoryRecordType>
   fnSearch: (arg1: string) => void
}

export const SearchBarCategory: React.FC<SearchBarTaskType> = React.memo(({ categories, fnSearch }) => {
   const dispatch: AppDispatch = useDispatch();
   const [categoryFilter, tagFilter] = useSelector(getTaskFilter)
   const [categoryField, setCategoryField] = useState(categoryFilter)
   const onSearch = () => {
      fnSearch(categoryField)
   }
   if (!categories) {
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
         </Box>
         <Button variant="outlined" color="secondary"
            onClick={onSearch}
         >
            Search
         </Button>
      </Box>

   )
})