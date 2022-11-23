import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getTasks } from '../../redux/appSelector'
import { getCategoriesInit } from '../../redux/catReducer'
import { AppDispatch } from '../../redux/store'
import { TableTask } from './TableTask'

export const Tasks = () => {

   const dispatch: any = useDispatch();
   const tasks = useSelector(getTasks)
   // useEffect(() => {
   
   //    if (!tasks || tasks.length <= 0)
   //       dispatch(getTaskInit())
   // }, [])
   return (
      <TableTask list={tasks} />
     
   )
}
