import React, { useEffect, useState } from 'react';
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import Box from '@mui/material/Box'
//@ts-ignore
import styles from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, getChapterInfo } from './../../redux/appSelector'
import { getCategoriesInit } from '../../redux/catReducer';
import { detectItem } from '../utils/detectCategory';

const initDataChart = {
   0: null,
   1: null,
   2: null,
   3: null,
   4: null,
   5: null,
   6: null,
   7: null,
   8: null,
   9: null,
   10: null,
   11: null,
}

ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   LineElement,
   Title,
   Tooltip,
   Legend
);

export const options = {
   responsive: true,
   plugins: {
      legend: {
         position: 'top' as const,
      },
      title: {
         display: true,
         text: 'Успішність',
      },
   },
   interaction: {
      intersect: true,
   },
   scales: {
      x: {
         display: true,
         title: {
            display: true,

         }
      },
      y: {
         display: true,
         title: {
            display: true,
         },
         suggestedMin: 100,
         suggestedMax: 200
      }
   }
};

const labelsMonth = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень', 'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
const dataOptionsColor = [
   {
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
   },
   {
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
   }
]
type DataChapterType = {
   label: string
   data: Array<number | null>
   borderColor?: string
   backgroundColor?: string
   tension?: number
}

export const MainChapter: React.FC = () => {

   const dispatch: any = useDispatch()
   const chapter = useSelector(getChapterInfo)
   const categories = useSelector(getCategories)

   let dataChapter = [] as Array<DataChapterType>;
   const [dataChapters, setdataChapters] = useState({})
   useEffect(() => {
      return () => {
         if (categories.length <= 0)
            dispatch(getCategoriesInit())
      };
   }, [])
   const valuesFromObject = (obj: Object) => Object.values(obj).map((e) => (e));
   const mapFromObject = (obj: Object) => {
      let vars = []
      Object.values(obj).map((e) => {
         return vars[Object.keys(e)[0]] = Object.values(e)[0]
      });
      return vars
   }
   let t = {}
   for (const key in chapter) {
      if (Object.prototype.hasOwnProperty.call(chapter, key)) {
         const element = chapter[key];
         const recorded = mapFromObject(element)
         // t[detectItem(key, categories)] = valuesFromObject({ ...initDataChart, ...recorded })
         dataChapter.push({
            label: detectItem(key, categories),
            data: valuesFromObject({ ...initDataChart, ...recorded })
         })
      }
   }
   const defineLabels4Chapter = () => {
      let labels = [] as Array<string>
      for (let i = new Date().getMonth()+1; i < labelsMonth.length; i++) {
         labels.push(labelsMonth[i])
         if (labels.length === 12) {
            return labels
         }
      }
   }
   const setDataToChart = () => {
      let counter = 0;
      let dataOptions = { labels: defineLabels4Chapter(), datasets: [] as Array<DataChapterType> }
      for (const el of dataChapter) {
         dataOptions.datasets.push({
            ...el,
            ...dataOptionsColor[counter],
            tension: 0.4,
         })
         counter++;
      }
      return dataOptions
   }
   // console.log(setDataToChart())
   return (
      <Box sx={{ pb: 6 }}>
         <Box className={styles.wrapperChart}
            sx={{
               postion: 'relative', backgroundColor: 'bgmode.main', p: 1,
               boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
               borderRadius: '24px'
            }}>

            <Line options={options} data={setDataToChart()} />

         </Box>
      </Box>
   );
}
