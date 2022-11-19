import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Collapse from '@mui/material/Collapse'
import Button from '@mui/material/Button'
import { useState } from 'react'

type ButtonInform = {
   title: string
   subtitle: string
}
export const ButtonInform: React.FC<ButtonInform> = ({ title, subtitle }) => {
   return (
      <Box sx={{ backgroundColor: 'bgmode.main', color: 'fpage.main', borderRadius: '16px', pt: 2, pb: 2, pl: 1, pr: 1, border: '2px solid ', borderColor: 'bgmode.light', mb: 1 }}>
         <Typography variant="body2" color="fpage.main">{title}</Typography>
         <Typography variant="body2" color="fpage.main">{subtitle}</Typography>
      </Box>
   )
}

export const DateEvents = () => {
   const [isOpenDataEvents, setIsOpenDataEvents] = useState(false)
   return (
      <Box >
         <Box>
            <ButtonInform title={'12,6vf'} subtitle={'Залишилося до зно з математики'} />
            <ButtonInform title={'4,6ved'} subtitle={'Залишилося до зно з історії'} />
            <ButtonInform title={'18,6d'} subtitle={'Залишилося до зно з мови'} />
            <ButtonInform title={'6 3 6f'} subtitle={'Залишилося до зно з геграфії'} />
         </Box>
         <Collapse in={isOpenDataEvents}>
            <ButtonInform title={'12,6vf'} subtitle={'Залишилося до зно з математики'} />
            <ButtonInform title={'4,6ved'} subtitle={'Залишилося до зно з історії'} />
            <ButtonInform title={'18,6d'} subtitle={'Залишилося до зно з мови'} />
            <ButtonInform title={'6 3 6f'} subtitle={'Залишилося до зно з геграфії'} />       <ButtonInform title={'12,6vf'} subtitle={'Залишилося до зно з математики'} />
            <ButtonInform title={'4,6ved'} subtitle={'Залишилося до зно з історії'} />
            <ButtonInform title={'18,6d'} subtitle={'Залишилося до зно з мови'} />
            <ButtonInform title={'6 3 6f'} subtitle={'Залишилося до зно з геграфії'} />       <ButtonInform title={'12,6vf'} subtitle={'Залишилося до зно з математики'} />
            <ButtonInform title={'4,6ved'} subtitle={'Залишилося до зно з історії'} />
            <ButtonInform title={'18,6d'} subtitle={'Залишилося до зно з мови'} />
            <ButtonInform title={'6 3 6f'} subtitle={'Залишилося до зно з геграфії'} />
         </Collapse>
         <Typography variant="body1" color="fpage.main" sx={{ textAlign: 'end' }}>
            <Button variant="text"
               sx={{ color: 'fpage.light' }}
               // color='warning'
               onClick={() => setIsOpenDataEvents(prev => !prev)}
            >See {isOpenDataEvents ? 'less' : 'all'}</Button>
         </Typography>
      </Box>
   )
}