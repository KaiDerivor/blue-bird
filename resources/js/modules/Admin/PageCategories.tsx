import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION_OF_CRUD, CREATE, DELETE, UPDATE } from '../../redux/appReducer'
import { getCategories } from '../../redux/appSelector'
import { CategoryRecordType, createCategory, deleteCategory, getCategoriesInit, updateCategory } from '../../redux/catReducer'
import { TableSimpleItem } from './TableSimpleItem'

export const CATEGORY = 'CATEGORY'

const Categories = React.memo(() => {

   const dispatch: any = useDispatch();
   const categories = useSelector(getCategories)
   const [switchHandler, setSwitchHandler] = useState<ACTION_OF_CRUD>(CREATE)

   useEffect(() => {
      if (!categories || categories.length <= 0)
         dispatch(getCategoriesInit())
   }, [])
   const handleConfirm = (categoryId = 0, category = {} as CategoryRecordType) => {
      switch (switchHandler) {
         case CREATE: {
            dispatch(createCategory(category))
            break;
         }
         case UPDATE: {
            dispatch(updateCategory(categoryId, category))
            break;
         }
         case DELETE: {
            dispatch(deleteCategory(categoryId))
            break;
         }
         default: {
            return;
         }

      }

   };
   return (
      <TableSimpleItem list={categories} handleConfirm={handleConfirm} setSwitchHandler={setSwitchHandler}
         typeDialog={CATEGORY} switchHandler={switchHandler}
      />
   )
})
export default Categories