import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getListEvents } from '../../redux/appSelector'
import { getCategoriesInit } from '../../redux/catReducer'
import { TableSimpleItem } from './TableSimpleItem'
import { createEvent, deleteEvent, EventRecordType, getEventsInit, updateEvent } from '../../redux/eventReducer'

const DataEvents = React.memo(() => {

   const dispatch: any = useDispatch();
   const events = useSelector(getListEvents)
   const [switchHandler, setSwitchHandler] = useState('save')
   const categories = useSelector(getCategories)

   useEffect(() => {
      return () => {
         if (!events || events.length <= 0)
            dispatch(getEventsInit())
         if (!categories || categories.length <= 0)
            dispatch(getCategoriesInit())
      }
   }, [])
   const handleConfirm = (eventId = 0, event = {} as EventRecordType) => {
      switch (switchHandler) {
         case 'save': {
            dispatch(createEvent(event))
            break;
         }
         case 'update': {
            dispatch(updateEvent(eventId, event))
            break;
         }
         case 'delete': {
            dispatch(deleteEvent(eventId))
            break;
         }
         default: {
            return;
         }

      }

   };
   return (
      <TableSimpleItem list={events} handleConfirm={handleConfirm} setSwitchHandler={setSwitchHandler} typeDialog="EVENT" />
   )
})

export default DataEvents
