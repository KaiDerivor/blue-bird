import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTags } from '../../redux/appSelector'
import { createTag, deleteTag, getTagsInit, TagRecordType, updateTag } from '../../redux/tagReducer'
import { TableSimpleItem } from './TableSimpleItem'

export const Tags = () => {

   const dispatch: any = useDispatch();
   const tasgs = useSelector(getTags)
   const [switchHandler, setSwitchHandler] = useState('save')

   useEffect(() => {
      return () => {
         if (!tasgs || tasgs.length <= 0)
            dispatch(getTagsInit())
      }
   }, [])
   const handleConfirm = (tagId = 0, tag: TagRecordType = { title: '', textUrl: '' }) => {
      switch (switchHandler) {
         case 'save': {
            dispatch(createTag(tag))
            break;
         }
         case 'update': {
            dispatch(updateTag(tagId, tag))
            break;
         }
         case 'delete': {
            dispatch(deleteTag(tagId))
            break;
         }
         default: {
            return;
         }

      }

   };
   return (
      <TableSimpleItem list={tasgs} handleConfirm={handleConfirm} setSwitchHandler={setSwitchHandler} typeDialog='TAG' />
   )
}
