import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

let configTheme = 'configCherryDark';

const configCherryDark = {
   palette: {
      mode: "dark",
      background: {
         default: "#211A1A",
         paper: "#2F2525",
      },
      //@ts-ignore
      bgmode: {
         light: '#362929',
         main: '#2F2525', //
         dark: '#5C3F3F' //
      },
      fpage: {
         dark: '#FFDAD9', // 
         main: '#EDE0DF',  //
         light: '#fff'
      },
      fmenu: {
         light: '#FFB3B5', //
         main: '#D7C2C1' //

      },
      paction: {
         main: '#5B1919' //
      }
   },
}
const configCherryLight = {
   palette: {
      mode: "light",
      background: {
         default: "#FCFCFC", //background
         paper: "#F5F0F0",  //common elements
      },
      bgmode: {
         light: '#F3EAEB', //color side menu 
         main: '#F5F0F0', //paper
         dark: '#FFDAD9' //selected element bg
      },
      fpage: {
         dark: '#2D1516', // choosen elemnt --icon
         main: '#1F1F1F',  //title color
         light: '#400008'
      },
      fmenu: {
         light: '#9c4146', //direct link
         main: '#534343' // not choosen elemnt --icon
      }
   }
}

const configGreenDark = {
   palette: {
      mode: "dark",
      background: {
         default: "#1A1C18",
         paper: "#232820",
      },
      //@ts-ignore
      bgmode: {
         light: '#272E23',
         main: '#232820', //
         dark: '#3E4A36' //
      },
      fpage: {
         dark: '#D9E7CB', // 
         main: '#E3E3DC',  //
         light: '#fff'
      },
      fmenu: {
         light: '#9cd67d', //
         main: '#C4C8BB' //

      },
      paction: {
         main: '#1E4E4E' //
      }
   },
}
const configGreenLight = {
   palette: {
      mode: "light",
      background: {
         default: "#FDFDF6", //background
         paper: "#F0F3E8",  //common elements
      },
      bgmode: {
         light: '#EBEFE2', //color side menu 
         main: '#F0F3E8', //paper
         dark: '#D9E7CB' //selected element bg
      },
      fpage: {
         dark: '#131F0D', // choosen elemnt --icon
         main: '#1F1F1F',  //title color
         light: '#400008'
      },
      fmenu: {
         light: '#386a20', //direct link
         main: '#43493E' // not choosen elemnt --icon
      },
      paction: {
         main: '#BBEBEB'
      }
   }
}

const configYellowDark = {
   palette: {
      mode: "dark",
      background: {
         default: "#1C1C16",
         paper: "#28281C",
      },
      //@ts-ignore
      bgmode: {
         light: '#2D2D1E',
         main: '#28281C', //
         dark: '#48482D' //
      },
      fpage: {
         dark: '#E6E4BF', // 
         main: '#E5E2D9',  //
         light: '#fff'
      },
      fmenu: {
         light: '##cbcc58', //
         main: '#C9C7B6' //

      },
      paction: {
         main: '#254E40' //
      }
   },
}
const configYellowLight = {
   palette: {
      mode: "light",
      background: {
         default: "#FDFDF6", //background
         paper: "#F4F1E4",  //common elements
      },
      bgmode: {
         light: '#F0EDDD', //color side menu 
         main: '#F4F1E4', //paper
         dark: '#E6E4BF' //selected element bg
      },
      fpage: {
         dark: '#1C1D06', // choosen elemnt --icon
         main: '#1F1F1F',  //title color
         light: '#400008'
      },
      fmenu: {
         light: '#cbcc58', //direct link
         main: '#48473A' // not choosen elemnt --icon
      },
      paction: {
         main: '#BFEDD9'
      }
   }
}

const configPurpleDark = {
   palette: {
      mode: "dark",
      background: {
         default: "#1B181C",
         paper: "#262028",
      },
      //@ts-ignore
      bgmode: {
         light: '#2b232e',
         main: '#262028', //
         dark: '#45364a' //
      },
      fpage: {
         dark: '#e0cbe7', // 
         main: '#e1dce3',  //
         light: '#fff'
      },
      fmenu: {
         light: '#cbcc58', //
         main: '#c17dd6' //

      },
      paction: {
         main: '#254E40' //
      }
   },
}
const configYPurpleight = {
   palette: {
      mode: "light",
      background: {
         default: "#FBF5FD", //background
         paper: "#F0E8F3",  //common elements
      },
      bgmode: {
         light: '#ECE2EF', //color side menu 
         main: '#F0E8F3', //paper
         dark: '#E0CBE7' //selected element bg
      },
      fpage: {
         dark: '#463E49', // choosen elemnt --icon
         main: '#1F1F1F',  //title color
         light: '#400008'
      },
      fmenu: {
         light: '#59206A', //direct link
         main: '#463E49' // not choosen elemnt --icon
      },
      paction: {
         main: '#BFEDD9'
      }
   }
}
export const themeVariants = {
   configDarkRED: createTheme({
      palette: {
         mode: "dark",
         background: {
            default: "#211A1A",
            paper: "#2F2525",
         },
         //@ts-ignore
         bgmode: {
            light: '#362929',
            main: '#2F2525', //
            dark: '#5C3F3F' //
         },
         fpage: {
            dark: '#FFDAD9', // 
            main: '#EDE0DF',  //
            light: '#fff'
         },
         fmenu: {
            light: '#FFB3B5', //
            main: '#D7C2C1' //

         },
         paction: {
            main: '#5B1919' //
         }
      },
   }),
   configLightRED: createTheme({
      palette: {
         mode: "light",
         background: {
            default: "#FCFCFC", //background
            paper: "#F5F0F0",  //common elements
         },
         //@ts-ignore
         bgmode: {
            light: '#F3EAEB', //color side menu 
            main: '#F5F0F0', //paper
            dark: '#FFDAD9' //selected element bg
         },
         fpage: {
            dark: '#2D1516', // choosen elemnt --icon
            main: '#1F1F1F',  //title color
            light: '#400008'
         },
         fmenu: {
            light: '#9c4146', //direct link
            main: '#534343' // not choosen elemnt --icon
         }
      }
   }),
   configDarkGREEN: createTheme({
      palette: {
         mode: "dark",
         background: {
            default: "#1C1C16",
            paper: "#28281C",
         },
         //@ts-ignore
         bgmode: {
            light: '#2D2D1E',
            main: '#28281C', //
            dark: '#48482D' //
         },
         fpage: {
            dark: '#E6E4BF', // 
            main: '#E5E2D9',  //
            light: '#fff'
         },
         fmenu: {
            light: '##cbcc58', //
            main: '#C9C7B6' //

         },
         paction: {
            main: '#254E40' //
         }
      },
   }),
   configLightGREEN: createTheme({
      palette: {
         mode: "light",
         background: {
            default: "#FDFDF6", //background
            paper: "#F0F3E8",  //common elements
         },
         //@ts-ignore
         bgmode: {
            light: '#EBEFE2', //color side menu 
            main: '#F0F3E8', //paper
            dark: '#D9E7CB' //selected element bg
         },
         fpage: {
            dark: '#131F0D', // choosen elemnt --icon
            main: '#1F1F1F',  //title color
            light: '#400008'
         },
         fmenu: {
            light: '#386a20', //direct link
            main: '#43493E' // not choosen elemnt --icon
         },
         paction: {
            main: '#BBEBEB'
         }
      }
   }),
   configDarkYELLOW: createTheme({
      palette: {
         mode: "dark",
         background: {
            default: "#1C1C16",
            paper: "#28281C",
         },
         //@ts-ignore
         bgmode: {
            light: '#2D2D1E',
            main: '#28281C', //
            dark: '#48482D' //
         },
         fpage: {
            dark: '#E6E4BF', // 
            main: '#E5E2D9',  //
            light: '#fff'
         },
         fmenu: {
            light: '##cbcc58', //
            main: '#C9C7B6' //

         },
         paction: {
            main: '#254E40' //
         }
      },
   }),
   configLightYELLOW: createTheme({
      palette: {
         mode: "light",
         background: {
            default: "#FDFDF6", //background
            paper: "#F4F1E4",  //common elements
         },
         //@ts-ignore
         bgmode: {
            light: '#F0EDDD', //color side menu 
            main: '#F4F1E4', //paper
            dark: '#E6E4BF' //selected element bg
         },
         fpage: {
            dark: '#1C1D06', // choosen elemnt --icon
            main: '#1F1F1F',  //title color
            light: '#400008'
         },
         fmenu: {
            light: '#cbcc58', //direct link
            main: '#48473A' // not choosen elemnt --icon
         },
         paction: {
            main: '#BFEDD9'
         }
      }
   }),
   configDarkPURPLE: createTheme({
      palette: {
         mode: "dark",
         background: {
            default: "#1B181C",
            paper: "#262028",
         },
         //@ts-ignore
         bgmode: {
            light: '#2b232e',
            main: '#262028', //
            dark: '#45364a' //
         },
         fpage: {
            dark: '#e0cbe7', // 
            main: '#e1dce3',  //
            light: '#fff'
         },
         fmenu: {
            light: '#cbcc58', //
            main: '#c17dd6' //

         },
         paction: {
            main: '#254E40' //
         }
      },
   }),
   configLightPURPLE: createTheme({
      palette: {
         mode: "light",
         background: {
            default: "#FBF5FD", //background
            paper: "#F0E8F3",  //common elements
         },
         //@ts-ignore
         bgmode: {
            light: '#ECE2EF', //color side menu 
            main: '#F0E8F3', //paper
            dark: '#E0CBE7' //selected element bg
         },
         fpage: {
            dark: '#463E49', // choosen elemnt --icon
            main: '#1F1F1F',  //title color
            light: '#400008'
         },
         fmenu: {
            light: '#59206A', //direct link
            main: '#463E49' // not choosen elemnt --icon
         },
         paction: {
            main: '#BFEDD9'
         }
      }
   })
}
//@ts-ignore
export const darkTheme = createTheme(configCherryDark);

//@ts-ignore
export const lightTheme = createTheme(configCherryLight);