import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLikedCategories, getListEvents } from '../../redux/appSelector'
import { AppDispatch } from '../../redux/store'
import { getEventsInit, UPDATE } from '../../redux/eventReducer'


type ButtonInform = {
   title: string
   subtitle?: string
}
export const ButtonInform: React.FC<ButtonInform> = ({ title, subtitle }) => {
   return (
      <Box sx={{ backgroundColor: 'bgmode.main', color: 'fpage.main', borderRadius: '16px', pt: 2, pb: 2, pl: 1, pr: 1, border: '2px solid ', borderColor: 'bgmode.light', mb: 1 }}>
         <Typography variant="body1" color="inherit" sx={{ pb: 1 }}>{title}</Typography>
         <Typography variant="body2" color="inherit" sx={{ pl: 1 }}>{subtitle}</Typography>
      </Box>
   )
}

export const DateEvents = React.memo(() => {
   const dispatch: any = useDispatch()
   const [isOpenDataEvents, setIsOpenDataEvents] = useState(false)
   const events = useSelector(getListEvents)
   const likedCategories = useSelector(getLikedCategories)

   useEffect(() => {
      return () => {
         if (events.length === 0)
            dispatch(getEventsInit())
      };
   }, [])

   const renderEvents = () => {
      let elementButtons: Array<JSX.Element> = []
      let elementButtonsHidden: Array<JSX.Element> = []

      let isUpdateSetted = false;

      for (const event of events) {
         if (event.eventType === UPDATE) {
            if (isUpdateSetted) continue;
            isUpdateSetted = true;
            elementButtons.push(<ButtonInform key={event.id} title={event.title} subtitle={event.description} />)
         } else {
            likedCategories.includes(event.categoryId)
               ? elementButtons.push(<ButtonInform key={event.id} title={event.title} subtitle={event.description} />)
               : elementButtonsHidden.push(<ButtonInform key={event.id} title={event.title} subtitle={event.description} />)
         }

      }
      return (
         <>
            <Box>
               {elementButtons}
            </Box>
            <Collapse in={isOpenDataEvents}>
               {elementButtonsHidden}
            </Collapse>
            {elementButtonsHidden.length > 0 &&
               <Box sx={{ pb: 2 }}>
                  <Typography variant="body1" color="inherit" sx={{ textAlign: 'end' }}>
                     <Button variant="text"
                        sx={{ color: 'fpage.light' }}
                        onClick={() => setIsOpenDataEvents(prev => !prev)}
                     >See {isOpenDataEvents ? 'less' : 'all'}</Button>
                  </Typography>
               </Box>
            }
         </>
      )
   }

   return (
      <Box sx={{ color: 'fpage.main' }}>
         <Typography variant="h6" color="inherit" sx={{ pb: 2 }}>Події</Typography>

         <Box >
            {renderEvents()}
         </Box>
      </Box>
   )
})