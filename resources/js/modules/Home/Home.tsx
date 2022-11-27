import Container from '@mui/material/Container'
import React, { createRef, useEffect, useRef } from 'react';
import { WavesDivider } from '../common/WavesDivider';
import { WavesDividerFullWidth } from '../common/WavesDividerFullWidth';
import { Footer } from '../Footer/Footer';
import { HomeContent } from './HomeContent';
import { HomeHeader } from './HomeHeader'
import Fade from '@mui/material/Fade'
import { AppDispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';
import { toggleThemeMode } from '../../redux/appReducer';
import axios from 'axios';

export const Home = () => {
   const block1 = useRef(null);
   const block2 = useRef(null);
   const block3 = useRef(null);
   const blocks = [block1, block2, block3]
   // useEffect(() => {
   //    axios.post('http://127.0.0.1:8000/api/admin/tag?tag=rew').then(res=>{
   //       console.log(res)
   //    })
   // }, [])
   return (
      <Container maxWidth="xl" disableGutters >
         <Fade in={true} timeout={500} style={{ transitionDelay: '500ms' }}>
            <div>
               {/* <img src='storage/img-tasks/1.png'/> */}
               <HomeHeader block1={block1} block2={block2} />
               <HomeContent blocks={blocks} />
               <Footer />
            </div>
         </Fade>
      </Container >
   )
}