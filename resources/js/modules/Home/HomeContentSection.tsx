import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ButtonNavigate } from '../common/ButtonNavigate'
import { WavesDivider } from '../common/WavesDivider'
//@ts-ignore
import styles from './style.module.scss'
import AddRoadIcon from '@mui/icons-material/AddRoad'

type HomeContentSectionType = {
   title: string
   text?: string
   refB?: any
   buttonsTitle: Array<string>
   buttonsSubtitle: Array<string>
   isDivider?: boolean,
   imgUrl: string
}
export const HomeContentSection: React.FC<HomeContentSectionType> = React.memo(({ title, text = '', refB, buttonsTitle, buttonsSubtitle, isDivider, imgUrl }) => {
   return (
      <>
         <img className={styles.imgHeader_section} src={imgUrl} />

         <Box className={styles.contentSection} sx={{ color: "fpage.main" }} >
            
            <Typography variant="h2" color="inherit" sx={{ ml: 3, pt: 10, pb: 10 }}>{title}</Typography>
            {text !== '' && <Typography variant="body1" color="inherit">{text}</Typography>}
            <div ref={refB}></div>

            <Box >
               {buttonsTitle.map((title, index) => {
                  return <ButtonNavigate key={index} title={title} subtitle={buttonsSubtitle[index]} icon={<AddRoadIcon />} />
               })}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 10, pt: isDivider ? 15 : 0 }}>
               {isDivider &&
                  <WavesDivider />
               }
            </Box>
         </Box>
      </>

   )
})