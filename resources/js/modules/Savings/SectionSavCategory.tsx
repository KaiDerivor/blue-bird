import React from 'react'
import Box from '@mui/material/Box'
import { ItemGrid } from '../common/ItemGrid'
//@ts-ignore
import styles from './style.module.scss'
import Typography from '@mui/material/Typography'
import { ListItemSaveType } from './SavingsItems'


const styleBoxTitle = {
   pl: 3,
   pb: 5,
   pt: 8,
   '@media (max-width: 700px)': {
      pl: 1,
      pb: 3,
      pt: 5
   },
}

type SectionSavCategoryType = {
   title: string
   subtitle: string,
   listSavings: Array<ListItemSaveType>
}

export const SectionSavCategory: React.FC<SectionSavCategoryType> = React.memo(({ title, subtitle, listSavings }) => {
   const showAllItems = () => {
      let ret = [] as Array<JSX.Element>;

      if (listSavings.length > 0)
         listSavings.map((item: ListItemSaveType, index: number) => {
            ret.push(<ItemGrid key={index}
               text={item.subtitle} title={item.title}
               content={item.content} navLink={`/task/${item.taskId}`}
               numberOfTask={item.numberOfTask} imgUrl={item.imgUrl} />)
         })
      return ret;
   }
   return (
      <>
         <Box sx={{ pb: 3 }}>

            <Box sx={styleBoxTitle}>
               <Typography variant="h3" className={styles.listSavings_title} color="fpage.main">{title}</Typography>
               <Typography variant="subtitle1" color="fpage.main">{subtitle}</Typography>
            </Box>
            <Box className={styles.listSavings}>
               {showAllItems()}
               {listSavings.length === 0 &&
                  < ItemGrid text={''} title={''} isEmpty />
               }

            </Box>
         </Box>
      </>
   )
})