import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getResultTables, getTags } from '../../redux/appSelector'
import { getCategoriesInit } from '../../redux/catReducer'
import { getTagsInit } from '../../redux/tagReducer'
import { createResultTable, deleteResultTable, getResultTableInit, ResultRecordType, ResultTableType, updateResultTable } from '../../redux/taskReducer'
import { TableResults } from './TableResults'

const Results = React.memo(() => {

   const dispatch: any = useDispatch();
   const results: Array<ResultTableType> = useSelector(getResultTables)
   const [switchHandler, setSwitchHandler] = useState('save')

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
         case 'save': {
            dispatch(createResultTable(resultTable))
            break;
         }
         case 'update': {
            dispatch(updateResultTable(resultTableId, resultTable))
            break;
         }
         case 'delete': {
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
      <TableResults list={results}
         handleConfirm={handleConfirm}
         setSwitchHandler={setSwitchHandler}
         searchFilter={searchFilter}
      />
   )
})

export default Results
