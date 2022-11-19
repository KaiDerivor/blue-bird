import React from 'react';
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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'July'];

export const data = {
   labels,
   datasets: [
      {
         label: 'Математика',
         data: [100, 120, 130, 104, 106, 107, 125],
         borderColor: 'rgb(255, 99, 132)',
         backgroundColor: 'rgba(255, 99, 132, 0.5)',
         tension: 0.4,

         // cubicInterpolationMode: 'monotone',
      
      },
      {
         label: 'Укр. мова',
         data: [100, 100, 160, 154, 200, 192, 195],
         borderColor: 'rgb(53, 162, 235)',
         backgroundColor: 'rgba(53, 162, 235, 0.5)',
         tension: 0.4,
      },

   ],
};

export const MainChapter = () => {
   return (
      <Box sx={{pb:6}}>
         <Box className={styles.wrapperChart}
         sx={{ postion: 'relative',backgroundColor: 'bgmode.main', p: 1,
         boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
         borderRadius:'24px' }}>

            <Line options={options} data={data} />

         </Box>
      </Box>
   );
}
