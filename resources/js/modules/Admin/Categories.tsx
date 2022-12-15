import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../redux/appSelector'
import { CategoryRecordType, createCategory, deleteCategory, getCategoriesInit, updateCategory } from '../../redux/catReducer'
import { TableSimpleItem } from './TableSimpleItem'

const Categories =React.memo( () => {

   const dispatch: any = useDispatch();
   const categories = useSelector(getCategories)
   const [switchHandler, setSwitchHandler] = useState('save')

   useEffect(() => {
      return () => {
         if (!categories || categories.length <= 0)
            dispatch(getCategoriesInit())
      }
   }, [])
   const handleConfirm = (categoryId = 0, category = {} as CategoryRecordType) => {
      switch (switchHandler) {
         case 'save': {
            dispatch(createCategory(category))
            break;
         }
         case 'update': {
            dispatch(updateCategory(categoryId, category))
            break;
         }
         case 'delete': {
            dispatch(deleteCategory(categoryId))
            break;
         }
         default: {
            return;
         }

      }

   };
   return (
      <TableSimpleItem list={categories} handleConfirm={handleConfirm} setSwitchHandler={setSwitchHandler} typeDialog="CATEGORY" />
   )
})
export default Categories