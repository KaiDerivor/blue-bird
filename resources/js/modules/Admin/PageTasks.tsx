import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getTags, getTasks } from '../../redux/appSelector'
import { getCategoriesInit } from '../../redux/catReducer'
import { getTagsInit } from '../../redux/tagReducer'
import { getTasksInit } from '../../redux/taskReducer'
import { TableTask } from './TableTask'
import { createTask, deleteTask, TaskRecordType, updateTask } from '../../redux/taskReducer';
import { ACTION_OF_CRUD, CREATE, DELETE, UPDATE } from '../../redux/appReducer'
import { SearchBarCategoryTag } from './SearchBarCategoryTag'

const Tasks = React.memo(() => {

   const dispatch: any = useDispatch();
   const tasks = useSelector(getTasks)
   const tags = useSelector(getTags)
   const categories = useSelector(getCategories)
   const [switchHandler, setSwitchHandler] = useState<ACTION_OF_CRUD>(CREATE)

   useEffect(() => {
      if (!tasks || tasks.length <= 0)
         dispatch(getTasksInit())
      if (!tags || tags.length <= 0)
         dispatch(getTagsInit())
      if (!categories || categories.length <= 0)
         dispatch(getCategoriesInit())
   }, [])

   const handleConfirm = (taskId = '' as string | number, field: TaskRecordType = {}) => {
      switch (switchHandler) {
         case CREATE: {
            dispatch(createTask(field))
            break;
         }
         case UPDATE: {
            dispatch(updateTask(taskId, field))
            break;
         }
         case DELETE: {
            dispatch(deleteTask(taskId))
            break;
         }
         default: {
            return;
         }
      }
   };
   const searchFilter = (categoryId = '', tagId = '') => {
      debugger
      dispatch(getTasksInit(categoryId, tagId))
   }
   return (
      <>
         <SearchBarCategoryTag categories={categories} tags={tags} fnSearch={searchFilter} />
         <TableTask list={tasks} categories={categories} tags={tags} handleConfirm={handleConfirm} setSwitchHandler={setSwitchHandler} switchHandler={switchHandler} />
      </>

   )
})

export default Tasks

