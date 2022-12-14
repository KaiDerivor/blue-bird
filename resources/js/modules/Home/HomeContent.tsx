import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { HomeContentSection } from './HomeContentSection'
//@ts-ignore
import styles from './style.module.scss'
import Fade from '@mui/material/Fade';

type HomeContentType = {
   blocks: Array<any>
}

export const HomeContent: React.FC<HomeContentType> = ({ blocks }) => {
   const [scrolled, setScrolled] = useState(0)
   const [fadeNumberImg, setFadeNumberImg] = useState(0)
   let scrollBlock3 = 0;
   useEffect(() => {
      const handleScroll = () => {
         setScrolled(window.scrollY)
      }
      window.addEventListener('scroll', handleScroll)
      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])

   {
      if (blocks[0].current) {
         const coorsBlock1 = blocks[0].current.getBoundingClientRect().top;
         const coordBlock2 = blocks[1].current.getBoundingClientRect().top;
         const coordBlock3 = blocks[2].current.getBoundingClientRect().top;
         
         const triggerStart = window.innerHeight * 1.25;
         scrollBlock3 = coordBlock3;
         if (coordBlock3 < triggerStart) {
            fadeNumberImg !== 2 && setFadeNumberImg(2)
         } else if (coordBlock2 < triggerStart) {
            fadeNumberImg !== 1 && setFadeNumberImg(1)
         } else {
            fadeNumberImg !== 0 && setFadeNumberImg(0)
         }
      }
   }

   const buttonsTitle = ['Lorenm', 'Calroof', 'Heneki']
   const buttonsSubtitle = ['Lorem ipsum dolor sit amet. Consectetur adipisciscig elit', 'Lorem ipsum dolor sit amet. Consectetur adipisciscig elit', 'Lorem ipsum dolor sit amet. Consectetur adipisciscig elit']
   return (
      <>
         <Box className={styles.homeContent}>
            <Box className={styles.homeContent__section} sx={{}}>
               <HomeContentSection title="Clarior es solito" buttonsTitle={buttonsTitle} buttonsSubtitle={buttonsSubtitle} isDivider refB={blocks[0]} imgUrl={'https://source.unsplash.com/random/?dark'} />
               <HomeContentSection title="Clarior es solito" buttonsTitle={buttonsTitle} buttonsSubtitle={buttonsSubtitle} isDivider refB={blocks[1]} imgUrl={'https://source.unsplash.com/random/?wood'} />
               <HomeContentSection title="Clarior es solito" buttonsTitle={buttonsTitle} buttonsSubtitle={buttonsSubtitle} refB={blocks[2]} imgUrl={'https://source.unsplash.com/random/?city'} />
            </Box>
            <Box

               sx={{
                  width: 'calc(50vw - 80px)',
                  position: 'relative',
                  pb: 4
               }}
            >
               <Box sx={{
                  position: 'sticky',
                  top: '8px'
               }}>
                  <Fade in={fadeNumberImg === 0 || window.innerWidth < 1210} appear timeout={600}>
                     <Box className={styles.fadeWrapper} style={{
                        backgroundImage: 'url(https://source.unsplash.com/random/?dark)',
                        zIndex: 10
                     }}
                     >
                     </Box>
                  </Fade>
                  <Fade in={fadeNumberImg === 1 || window.innerWidth < 1210} appear timeout={600}>
                     <Box className={styles.fadeWrapper} style={{
                        backgroundImage: 'url(https://source.unsplash.com/random/?wood)',
                        zIndex: 20
                     }}
                     >
                     </Box>
                  </Fade>
                  <Fade in={fadeNumberImg === 2 || window.innerWidth < 1210} appear timeout={600}>
                     <Box className={styles.fadeWrapper} style={{
                        backgroundImage: 'url(https://source.unsplash.com/random/?cat)',
                        position: scrollBlock3 < window.innerHeight / 1.1 ? 'relative' : 'absolute',
                        zIndex: 30
                     }}
                     >
                     </Box>
                  </Fade>
               </Box>
            </Box>
         </Box>
      </>
   )
}