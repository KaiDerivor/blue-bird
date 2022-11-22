import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../redux/appSelector'
import { getCategoriesInit } from '../../redux/catReducer'
import { AppDispatch } from '../../redux/store'
import { TableCat } from './TableCat'

export const Categories = () => {

   const dispatch: any = useDispatch();
   const categories = useSelector(getCategories)
   useEffect(() => {
   
      if (!categories || categories.length <= 0)
         dispatch(getCategoriesInit())
   }, [])
   return (
      <TableCat list={categories} />
     
   )
}
