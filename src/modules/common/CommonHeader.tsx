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
export const CommonHeader: React.FC<CommonHeaderType> = ({ title, subtitle }) => {

   return (
      <>
         <Box className={styles.header} sx={{ mb: 9 }} style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/1g_8dMsxYAfoZ_VS338syoSlyVpl5yD9Ho5eV7clDTqPGwaKElIciZTvzvxZeaM_-dE3vYWh6oZ4FyuUg3bRo21f6Ue56_ADwSBmh6kasSKS3EA5gQE=w2400-rj)' }}>
            <Box className={styles.header__wrapper} sx={{ pb: 4 }}>
               <Typography className={styles.header__title} variant="h1" color="#fff" >
                  {title}
               </Typography>
               <Typography className={styles.header__subtitle} variant="h5" color="#fff">
                  {subtitle}
               </Typography>
            </Box>
         </Box>
      </>
   )
}