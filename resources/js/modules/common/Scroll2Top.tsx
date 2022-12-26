import React, { useEffect, useRef } from "react"
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
//@ts-ignore
import styles from './style.module.scss'
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';


export const Scroll2Top: React.FC = React.memo(() => {
   const scrollToTopElement = useRef<HTMLDivElement>();

   useEffect(() => {
      const handleScroll = () => {
         if (scrollToTopElement.current && window.scrollY > 400) {
            scrollToTopElement.current.classList.add(styles.scrollToTopElement_active)
         } else if (scrollToTopElement.current) {
            scrollToTopElement.current.classList.remove(styles.scrollToTopElement_active)
         }
      }
      window.addEventListener('scroll', handleScroll)
      return () => {
         window.removeEventListener('scroll', handleScroll)
      }
   }, [])
   return <Box ref={scrollToTopElement} className={styles.scrollToTopElement}>
      <Button className={styles.scrollToTopElement__button} size='large' onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}>
         <ArrowCircleUpIcon sx={{ fontSize: '50px', color: 'fpage.main', backgroundColor: 'bgmode.light', borderRadius: '50%' }} />
      </Button>
   </Box >
})