import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { ButtonNavigate } from '../common/ButtonNavigate'
import { WavesDivider } from '../common/WavesDivider'
import styles from './style.module.scss'

type HomeContentSectionType = {
   title: string
   text?: string
   refB?: any
   buttonsTitle: Array<string>
   buttonsSubtitle: Array<string>
   isDivider: boolean
}
export const HomeContentSection: React.FC<HomeContentSectionType> = ({ title, text = '', refB, buttonsTitle, buttonsSubtitle, isDivider }) => {
   return (
      <Box className={styles.contentSection} >
         <Typography variant="h2" color="palette.fpage.main" sx={{ ml: 3 }}>Lorem ipsum dol</Typography>
         {text !== '' && <Typography variant="body1" color="palette.fpage.main">{text}</Typography>}
         <Box sx={{ pl: 1 }}>
            {buttonsTitle.map((title, index) => {
               return <ButtonNavigate key={index} title={title} subtitle={buttonsSubtitle[index]} />
            })}
         </Box>
         <div ref={refB}></div>
         {isDivider &&
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
               <WavesDivider />
            </Box>
         }
      </Box>
   )
}