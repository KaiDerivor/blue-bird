import Container from '@mui/material/Container'
import { createRef, useRef } from 'react';
import { WavesDivider } from '../common/WavesDivider';
import { WavesDividerFullWidth } from '../common/WavesDividerFullWidth';
import { Footer } from '../Footer/Footer';
import { HomeContent } from './HomeContent';
import { HomeHeader } from './HomeHeader'

export const Home = () => {
   const block1 = useRef(null);
   const block2 = useRef(null);
   const block3 = useRef(null);
   const blocks = [block1, block2, block3]
   return (
      <Container maxWidth="xl" disableGutters >
         <HomeHeader block1={block1} block2={block2} />
         <HomeContent blocks={blocks} />
         <Footer />
      </Container>
   )
}