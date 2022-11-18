
import Box from '@mui/material/Box'
import { useParams } from 'react-router-dom'
import { CourseItemHeader } from '../common/CourseItemHeader'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { ButtonNavigate } from '../common/ButtonNavigate'

export const CourseItem = () => {
   const [taskNumber, setTaskNumber] = useState(1)
   const params = useParams();
   const clickNumberTaskHandler = (value: HTMLButtonElement) => {
      const numberTask = value.getAttribute('data-number-task');
      if (numberTask) {
         setTaskNumber(+numberTask)
      }
   }
   const renderTaskButtons = () => {
      let buttons: Array<JSX.Element> = [];
      for (let i = 1; i <= 56; i++) {
         buttons.push(<Button variant="outlined"
            key={i}
            data-number-task={i}
            onClick={(el) => clickNumberTaskHandler(el.target as HTMLButtonElement)}
            sx={{
               borderColor: i === taskNumber ? 'fpage.main' : 'bgmode.main',
               backgroundColor: i === taskNumber ? 'bgmode.dark' : 'bgmode.main',
               color: i === taskNumber ? "fpage.light" : 'fpage.dark', m: 0.2,
            '&:hover': { backgroundColor: 'bgmode.main', borderColor: 'red' }
            }
   }
         > { i }</Button >)
}
return buttons
   }
return (
   <Box>
      <CourseItemHeader title={`${params.category}`} subtitle="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut nostrum cum consequuntur aperiam quia temporibus minus dolores officiis eum voluptas, rem expedita cumque vitae consequatur, sunt ducimus? Accusantium, eligendi dolor?" />
      <Box sx={{ mb: 3 }}>
         {renderTaskButtons()}
      </Box>
      <Box sx={{margin:'0 auto'}}>{taskNumber}</Box>
   </Box>
)
}