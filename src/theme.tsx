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
         dark:'#333',
         main: "#E3E3E3",
         light: "#fff",
      },

   },

});


export const lightTheme = createTheme({
   palette: {
      mode: "light",
      // background: {
      //   default: "#3a2524",
      //   paper: "#46505A",
      // },
      // //@ts-ignore
      // fpage: {
      //   main: "#EF8B6B",
      //   light: "#262335",
      // },
   },

});