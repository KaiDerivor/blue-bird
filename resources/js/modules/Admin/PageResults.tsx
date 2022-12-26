import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ACTION_OF_CRUD, CREATE, DELETE, UPDATE } from '../../redux/appReducer'
import { getCategories, getResultTables, getTags } from '../../redux/appSelector'
import { getCategoriesInit } from '../../redux/catReducer'
import { getTagsInit } from '../../redux/tagReducer'
import { createResultTable, deleteResultTable, getResultTableInit, ResultRecordType, ResultTableType, updateResultTable } from '../../redux/taskReducer'
import { SearchBarCategoryTag } from './SearchBarCategoryTag'
import { TableResults } from './TableResults'

const Results = React.memo(() => {

   const dispatch: any = useDispatch();
   const results: Array<ResultTableType> = useSelector(getResultTables)
   const [switchHandler, setSwitchHandler] = useState<ACTION_OF_CRUD>(CREATE)

   const tags = useSelector(getTags)
   const categories = useSelector(getCategories)


   useEffect(() => {
      return () => {
         if (!tags || tags.length <= 0)
            dispatch(getTagsInit())
         if (!categories || categories.length <= 0)
            dispatch(getCategoriesInit())
         if (!results || results.length <= 0)
            dispatch(getResultTableInit())
      }
   }, [])

   const handleConfirm = (resultTableId = 0, resultTable = {} as ResultRecordType) => {
      switch (switchHandler) {
         case CREATE: {
            dispatch(createResultTable(resultTable))
            break;
         }
         case UPDATE: {
            dispatch(updateResultTable(resultTableId, resultTable))
            break;
         }
         case DELETE: {
            dispatch(deleteResultTable(resultTableId))
            break;
         }
         default: {
            return;
         }

      }

   };
   const searchFilter = (categoryId = '', tagId = '') => {
      dispatch(getResultTableInit(categoryId, tagId))
   }
   return (
      <>
         <SearchBarCategoryTag categories={categories} tags={tags} fnSearch={searchFilter} />
         <TableResults list={results}
            handleConfirm={handleConfirm}
            setSwitchHandler={setSwitchHandler}
            switchHandler={switchHandler}
         />
      </>
   )
})

export default Results
