import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { ButtonNavigate } from '../common/ButtonNavigate'
import { WavesDivider } from '../common/WavesDivider'
import styles from './style.module.scss'

type CommonHeaderType = {
   title: string
   subtitle: string
}
export const CourseItemHeader: React.FC<CommonHeaderType> = ({ title, subtitle }) => {

   return (
      <>
         <Box sx={{mb:4}}
         >
            <Typography className={styles.header__title} variant="h3" color="fpage.main" >
               {title}
            </Typography>
            <Typography className={styles.header__subtitle} variant="h6" color="fpage.main">
               {subtitle}
            </Typography>
         </Box>
      </>
   )
}