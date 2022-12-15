import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getCategoryTagList, getTags } from '../../redux/appSelector'
import { CategoryTagRecordType, deleteCategoryTag, getCategoriesInit, getCategoryTagsInit, updateCategoryTag } from '../../redux/catReducer'
import { getTagsInit } from '../../redux/tagReducer'
import { TableCategoryTag } from './TableCategoryTags'

const CategoryTags = React.memo(() => {

   const dispatch: any = useDispatch();
   const categoryTags = useSelector(getCategoryTagList)
   const tags = useSelector(getTags)
   const categories = useSelector(getCategories)

   const [switchHandler, setSwitchHandler] = useState('save')
   const searchFilter = (categoryId = '', tagId = '') => {
      dispatch(getCategoryTagsInit(categoryId, tagId))
   }
   useEffect(() => {
      return () => {
         if (!categoryTags || categoryTags.length <= 0)
            dispatch(getCategoryTagsInit())
         if (!tags || tags.length <= 0)
            dispatch(getTagsInit())
         if (!categories || categories.length <= 0)
            dispatch(getCategoriesInit())
      }
   }, [])

   const handleConfirm = (categoryTagId = 0, categoryTag = {} as CategoryTagRecordType) => {
      switch (switchHandler) {
         case 'save': {
            // dispatch(createResultTable (categoryTag))
            break;
         }
         case 'update': {
            dispatch(updateCategoryTag(categoryTagId, categoryTag))
            break;
         }
         case 'delete': {
            dispatch(deleteCategoryTag(categoryTagId))
            break;
         }
         default: {
            return;
         }

      }

   };
   return (
      <TableCategoryTag
         list={categoryTags}
         handleConfirm={handleConfirm}
         setSwitchHandler={setSwitchHandler}
         fnSearch={searchFilter}
      />
   )
})
export default CategoryTags
