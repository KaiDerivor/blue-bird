import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ButtonNavigate } from '../common/ButtonNavigate'
import { WavesDivider } from '../common/WavesDivider'
import styles from './style.module.scss'
import AddRoadIcon from '@mui/icons-material/AddRoad';

type HomeContentSectionType = {
   title: string
   text?: string
   refB?: any
   buttonsTitle: Array<string>
   buttonsSubtitle: Array<string>
   isDivider: boolean,
   imgUrl: string
}
export const HomeContentSection: React.FC<HomeContentSectionType> = ({ title, text = '', refB, buttonsTitle, buttonsSubtitle, isDivider, imgUrl }) => {
   return (
      <>
         <img className={styles.imgHeader_section} src={imgUrl} />
         <Box className={styles.contentSection} >
            <Typography variant="h2" color="palette.fpage.main" sx={{ ml: 3, pt: 10, pb: 10 }}>{title}</Typography>
            {text !== '' && <Typography variant="body1" color="palette.fpage.main">{text}</Typography>}
            <Box sx={{ pl: 1 }}>
               {buttonsTitle.map((title, index) => {
                  return <ButtonNavigate key={index} title={title} subtitle={buttonsSubtitle[index]} icon={<AddRoadIcon />} />
               })}
            </Box>
            <div ref={refB}></div>
            {isDivider &&
               <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pb: 10, pt: 10 }}>
                  <WavesDivider />
               </Box>
            }
         </Box>
      </>

   )
}