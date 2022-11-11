import Box from '@mui/material/Box'
import { useEffect, useState } from 'react'
import { HomeContentSection } from './HomeContentSection'
import styles from './style.module.scss'
import Fade from '@mui/material/Fade';

type HomeContentType = {
   blocks: Array<any>
}
export const HomeContent: React.FC<HomeContentType> = ({ blocks }) => {
   const [scrolled, setScrolled] = useState(0)
   const [fadeNumberImg, setFadeNumberImg] = useState(0)
   // const scrollHandle = () => {
   //    setScrolled(window.scrollY)
   //    console.log(scrolled)
   // }
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
         if (blocks[1].current.getBoundingClientRect().top < 1520 && blocks[1].current.getBoundingClientRect().top > 550) {
            fadeNumberImg !== 1 && setFadeNumberImg(1)
         } else if (blocks[1].current.getBoundingClientRect().top < 1520) {
            fadeNumberImg !== 2 && setFadeNumberImg(2)
         } else {
            fadeNumberImg !== 0 && setFadeNumberImg(0)
         }
         // console.log(blocks[0].current.getBoundingClientRect().top)
         console.log(blocks[1].current.getBoundingClientRect().top < 1520 && blocks[1].current.getBoundingClientRect().top > 550,blocks[1].current.getBoundingClientRect().top < 1520)

      }
   }

   const buttonsTitle = ['Lorenm', 'Calroof', 'Heneki', 'Teneris']
   const buttonsSubtitle = ['Lorem ipsum dolor sit amet. Consectetur adipisciscig elit', 'Lorem ipsum dolor sit amet. Consectetur adipisciscig elit', 'Lorem ipsum dolor sit amet. Consectetur adipisciscig elit', 'Lorem ipsum dolor sit amet. Consectetur adipisciscig elit']
   return (
      <>
         <Box className={styles.homeContent}>
            <Box className={styles.homeContent__section} sx={{}}>
               <HomeContentSection title="Clarior es solito" buttonsTitle={buttonsTitle} buttonsSubtitle={buttonsSubtitle} isDivider refB={blocks[0]} />
               <HomeContentSection title="Clarior es solito" buttonsTitle={buttonsTitle} buttonsSubtitle={buttonsSubtitle} isDivider refB={blocks[1]} />
               <HomeContentSection title="Clarior es solito" buttonsTitle={buttonsTitle} buttonsSubtitle={buttonsSubtitle} isDivider refB={blocks[2]} />
            </Box>
            <Box

               sx={{
                  width: 'calc(50vw - 80px)',
                  position: 'relative'
               }}
            >
               <Box sx={{
                  position: 'sticky', 
                  //  width: '400px',
                  top: '10px'
               }}>

                  <Fade in={fadeNumberImg === 0} appear={false} unmountOnExit >
                     <Box style={{ backgroundImage: 'url(https://source.unsplash.com/random/?dark)' }}
                        sx={{ width: '100%', height: '100vh' }}
                     >
                     </Box>
                  </Fade>
                  <Fade in={fadeNumberImg === 1} appear={false} unmountOnExit >
                     <Box style={{ backgroundImage: 'url(https://source.unsplash.com/random/?wood)' }}
                        sx={{ width: '100%', height: '100vh' }}
                     >
                     </Box>
                  </Fade>
                  <Fade in={fadeNumberImg === 2} appear={false} unmountOnExit >
                     <Box style={{ backgroundImage: 'url(https://source.unsplash.com/random/?city)' }}
                        sx={{ width: '100%', height: '100vh' }}
                     >
                     </Box>
                  </Fade>


               </Box>
            </Box>
         </Box>
      </>
   )
}