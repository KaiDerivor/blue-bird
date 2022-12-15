import React from 'react'
import { CommonHeader } from "../common/CommonHeader"
import { Container } from "@mui/system"
import Box from "@mui/material/Box"
import { Footer } from "../Footer/Footer"
import Fade from '@mui/material/Fade'
import { SavingsItems } from "./SavingsItems"

const Savings = React.memo(() => {
   return (
      <>
         <Fade in={true} timeout={500} style={{ transitionDelay: '500ms' }}>
            <Box>

               <CommonHeader title="Збережені" subtitle='Усі тести, параграфи, завдання, правила, які ви коли-небудь зберігали' />
               <Container maxWidth="xl">
                  <Box>
                     <SavingsItems />
                  </Box>
               </Container>

               <Footer />
            </Box>
         </Fade>
      </>
   )
})
export default Savings