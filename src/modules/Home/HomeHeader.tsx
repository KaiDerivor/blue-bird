import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { ButtonNavigate } from '../common/ButtonNavigate'
import { WavesDivider } from '../common/WavesDivider'
import styles from './style.module.scss'

type HomeHeader = {
   block1: any
   block2: any
}
export const HomeHeader: React.FC<HomeHeader> = ({ block1, block2 }) => {

   return (
      <>

         <Box className={styles.header} sx={{ mb: 3 }} style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/1g_8dMsxYAfoZ_VS338syoSlyVpl5yD9Ho5eV7clDTqPGwaKElIciZTvzvxZeaM_-dE3vYWh6oZ4FyuUg3bRo21f6Ue56_ADwSBmh6kasSKS3EA5gQE=w2400-rj)' }}>
            <Box className={styles.Header__wrapper} sx={{ pb: 4 }}>
               <Typography variant="h1" color="#fff" sx={{ textAlign: 'center' }}>
                  Blue Bird
               </Typography>
               <Typography variant="h5" color="#fff">
                  Material 3 is the latest version of Google’s open-source design system. Design and build beautiful, usable products with Material 3.
               </Typography>
            </Box>
            <Box className={styles.header__tableNavigate}>
               <ButtonNavigate title='Whts Mui3?' subtitle='Material 3 is the latest version of Google’ system' element={block1} />
               <ButtonNavigate title='Whts Mui322?' subtitle='Design and build beautiful, usable products with Material 3.' element={block2} />
            </Box>
         </Box>
         <Box className={styles.tableNavigate}>
            <ButtonNavigate title='Whts Mui3?' subtitle='Material 3 is the latest version of Google’ system' element={block1} />
            <ButtonNavigate title='Whts Mui322?' subtitle='Design and build beautiful, usable products with Material 3.' element={block2} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 10, mb: 10 }}>
               <WavesDivider />
            </Box>
         </Box>
      </>
   )
}