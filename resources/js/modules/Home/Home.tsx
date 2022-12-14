import React, { useRef } from 'react';
import Container from '@mui/material/Container'
import { Footer } from '../Footer/Footer';
import { HomeContent } from './HomeContent';
import { HomeHeader } from './HomeHeader'
import Fade from '@mui/material/Fade'

export const Home = React.memo(() => {
   const block1 = useRef(null);
   const block2 = useRef(null);
   const block3 = useRef(null);
   const blocks = [block1, block2, block3]
   return (
      <Container maxWidth="xl" disableGutters >
         <Fade in={true} timeout={500} style={{ transitionDelay: '500ms' }}>
            <div>
               <HomeHeader block1={block1} block2={block2} />
               <HomeContent blocks={blocks} />
               <Footer />
            </div>
         </Fade>
      </Container >
   )
})