import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getTask } from '../../redux/appSelector'
import { getCategoriesInit } from '../../redux/catReducer'
import { AppDispatch } from '../../redux/store'
import { TableCat } from './TableCat'

export const Categories = () => {

   const dispatch: any = useDispatch();
   const tasks = useSelector(getTask)
   // useEffect(() => {
   
   //    if (!tasks || tasks.length <= 0)
   //       dispatch(getTaskInit())
   // }, [])
   return (
      <TableCat list={tasks} />
     
   )
}
