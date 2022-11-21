import React from 'react';
//@ts-ignore
import styles from './styleFormLayouts.module.scss';
import FormHeader from './HeaderForm';
import Box from '@mui/material/Box'

type FormLayoutsType = {
   title: string,
   text: string,
   link: string,
   textLink: string,
   children: JSX.Element
}

const FormLoyauts: React.FC<FormLayoutsType> = ({ children, ...props }) => {
   return <section className={styles.page} >
      <Box className={styles.page__wrapper}
      sx={{backgroundColor:'bgmode.main',color:'fpage.main',borderColor:'bgmode.dark'}}
      >
         <div className={styles.row}>
            <div className={styles.sectionForm}>
               <FormHeader
                  title={props.title}
                  text={props.text}
                  link={props.link}
                  textLink={props.textLink}
               />
               {children}
            </div>
         </div>
      </Box>
   </section>
}
export default FormLoyauts;