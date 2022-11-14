import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

export const darkTheme = createTheme({
   palette: {
      mode: "dark",
      background: {
         default: "#3a2524",
         paper: "#46505A",
      },
      //@ts-ignore
      fpage: {
         dark: '#333',
         main: "#E3E3E3",
         light: "#fff",
      },
      bgmode:{
         light:'#150220',
         main:'#28292A'
      }
   },

});


export const lightTheme = createTheme({
   palette: {
      mode: "light",
      // background: {
      //   default: "#3a2524",
      //   paper: "#46505A",
      // },
      //@ts-ignore
      fpage: {
         dark: '#333',
         main: "#717171",
         light: "#262335",
      },
      bgmode:{
         light:'#ec9fff',
         main:'#F8F8FD'
      }
   },

});