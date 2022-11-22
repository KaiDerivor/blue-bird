import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTags } from '../../redux/appSelector'
import { getTagsInit } from '../../redux/tagReducer'
import { TableTag } from './TableTag'

export const Tags = () => {

   const dispatch: any = useDispatch();
   const tags = useSelector(getTags)
   useEffect(() => {
   
      if (!tags || tags.length <= 0)
         dispatch(getTagsInit())
   }, [])
   return (
      <TableTag list={tags} />
     
   )
}
