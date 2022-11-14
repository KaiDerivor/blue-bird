import { CommonHeader } from "../common/CommonHeader"
import Typography from '@mui/material/Typography'
import { Container } from "@mui/system"
import Box from "@mui/material/Box"
import styles from './style.module.scss'
import { ItemGrid } from "../common/ItemGrid"
import { Footer } from "../Footer/Footer"

const styleBoxTitle = {
   pl: 3,
   pb: 5,
   pt: 8,
   '@media (max-width: 700px)': {
      pl:1,
      pb:3,
      pt:5
   },
}

export const Savings = () => {
   return (
      <>
         <CommonHeader title="Збережені" subtitle='Усі тести, параграфи, завдання, правила, які ви коли-небудь зберігали' />
         <Container maxWidth="xl">
            <Box sx={styleBoxTitle}>
               <Typography variant="h3" className={styles.listSavings_title} color="fpage.main">Збережені тести</Typography>
               <Typography variant="subtitle1" color="fpage.main">Збережені тести</Typography>
            </Box>
            <Box className={styles.listSavings}>
               <ItemGrid text={'Lizards are a widespread group of squamate reptiles, with over 6,000\nspecies, ranging across all continents except Antarctica'}
                  title={'Lizard'} />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
            </Box>
            <Box sx={styleBoxTitle}>
               <Typography variant="h3" className={styles.listSavings_title} color="fpage.main">Збережені завдання</Typography>
               <Typography variant="subtitle1" color="fpage.main">Збережені завдання</Typography>
            </Box>
            <Box className={styles.listSavings}>
               <ItemGrid text={'Lizards are a widespread group of squamate reptiles, with over 6,000\nspecies, ranging across all continents except Antarctica'}
                  title={'Lizard'} />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
            </Box>
            <Box sx={styleBoxTitle}>
               <Typography variant="h3" className={styles.listSavings_title} color="fpage.main">Збережені параграфи</Typography>
               <Typography variant="subtitle1" color="fpage.main">Збережені параграфи</Typography>
            </Box>
            <Box className={styles.listSavings}>
               <ItemGrid text={'Lizards are a widespread group of squamate reptiles, with over 6,000\nspecies, ranging across all continents except Antarctica'}
                  title={'Lizard'} />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
               <ItemGrid text={''} title={''} isEmpty />
            </Box>


         </Container>

         <Footer />
      </>
   )
}