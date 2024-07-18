import { PaletteMode } from "@mui/material"

const spotifyGreen = {
  300: '#6fa8dc',
  500: '#3d85c6',
  900: '#0b5394',
}

export default {
  themeName: 'Spotify-ish',

  typography: {
    fontFamily: "system-ui, 'Helvetica Neue', Helvetica, Arial",
    h6: {
      fontSize: '1rem', // AppBar title
    },
  },
  palette: {
    primary: {
      light: spotifyGreen['300'],
      main: spotifyGreen['500'],
    },
    secondary: {
      main: '#fff',
      contrastText: '#fff',
    },
    background: {
      default: '#f6f8fc',
      paper: '#fff',
    },
    // type: 'dark' as PaletteMode,
    mode: 'light' as PaletteMode,
  },
  components: {
    // MuiPaper: {
    //   styleOverrides: {
    //     root: {
    //       boxShadow: "none"
    //     }
    //   }
    // },
    // MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       fontSize: '0.8rem',
    //       background: '#16537e',
    //       color: '#fff !important',
    //       border: '1px solid transparent',
    //       borderRadius: 500,
    //       '&:hover': {
    //         background: `${spotifyGreen['900']} !important`,
    //       },
    //       paddingTop: '0.3rem',
    //       paddingBottom: '0.3rem',
    //       paddingRight: '1rem',
    //       paddingLeft: '0.7rem',
    //       '.MuiButton-startIcon': {
    //         color: '#fff',
    //       },
    //     },
    //   },
    // },
    MuiTable: {
      styleOverrides: {
        root: {
          // padding: '10px 0',
          boxShadow: 'none ',
          backgroundColor: '#fff !important',
          transition: 'background-color .3s ease',
          '&:hover': {
            backgroundColor: '#fff !important',
          },
          '@global': {
            'td:nth-of-type(4)': {
              color: '#fff !important',
            },
          },
          '.MuiTableCell-root': {
            borderBottom: '1px solid #f5f5f5',
            padding: '8px !important',
            color: '#273126 !important',
            boxShadow: 'none'
          },
          '.MuiTableCell-head': {
            backgroundColor: '#fff !important',
            borderBottom: '1px solid #8e7cc3',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: 1.2,
          }
        }
      }
    },
    // MuiPaper: {
    //   styleOverrides: {
    //     root: {
    //       boxShadow: "none"
    //     }
    //   }
    // },
    // RaLayout: {
    //   styleOverrides: {
    //     root: {
    //       padding: '0px !important',
    //       background: 'linear-gradient(#171717, #121212)',
    //     },
    //   },
    // },

    RaLayout: {
      styleOverrides: {
        root: {
          '& .RaLayout-content': {
            borderRadius: '20px',
            backgroundColor: '#fff',
            padding: '5px !important',
            '& .css-16f1609': {
              margin: 0
            }
          },
        },
      },
    },
    RaCreate: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            boxShadow: "none"
          },
        },
      },

    },
    RaEdit: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            boxShadow: "none"
          },
        },
      },
    },
    RaShow: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            boxShadow: "none"
          },
        },
      },
    },
    RaList: {
      styleOverrides: {
        root: {
          // borderRadius: '20px',
          // backgroundColor: '#fff',
          // '& .RaList-content': {
          //   // backgroundColor: 'red',
          // },
          '& .MuiPaper-root': {
            boxShadow: "none"
          },
          padding: '10px !important',
          marginTop: '-15px'
        },
      },
      // content: {
      //   backgroundColor: 'inherit',
      // },
    },
    // RaListToolbar: {
    //   toolbar: {
    //     padding: '10px .55rem !important',
    //   },
    // },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          // color: spotifyGreen['500'],
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          // padding: '4px',
          // marginRight: '5px',
          paddingLeft: '15px',
          fontSize: '0.875rem',
          '&.RaMenuItemLink-active': {
            fontWeight: '600',
            color: '#124970 !important',
            backgroundColor: '#cfe2f3 !important',
            borderRadius: '0px 20px 20px 0px',
          },
          // '& .RaMenuItemLink-icon': {
          //   color: '#EFC44F',
          // },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '.75rem 0',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          paddingRight: '20px',
          // '& .css-5bvjsf': {
          //   width: "260px",
          //   webkitTransition: 'width 195ms cubic- bezier(0.4, 0, 0.6, 1) 0ms',
          //   transition: 'width 195ms cubic- bezier(0.4, 0, 0.6, 1) 0ms',
          // },
          background: '#f6f8fc',
          // paddingTop: '10px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        positionFixed: {
          color: "#16537e",
          background: '#f6f8fc !important',
          // background: '#16537e !important',
          boxShadow: 'none',
        },
      },
    },

    '& .MuiInput-root': {
      styleOverrides: {
        input: {
          paddingLeft: '.9rem',
          border: 0,
          '& .MuiInputBase-root': {
            backgroundColor: 'white !important',
            borderRadius: '20px !important',
            color: 'black',
            border: '0px',
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
            '& svg': {
              color: 'black !important',
            },

            '& .MuiOutlinedInput-input:-webkit-autofill': {
              borderRadius: '20px 0px 0px 20px',
              '-webkit-box-shadow': '0 0 0 100px #c2c1c2 inset',
              '-webkit-text-fill-color': 'black',
            },
          },
        },
      },
    },
    // RaFilter: {
    //   styleOverrides: {
    //     form: {
    //       '& .MuiOutlinedInput-input:-webkit-autofill': {
    //         '-webkit-box-shadow': '0 0 0 100px #28282b inset',
    //         '-webkit-text-fill-color': 'white',
    //       },
    //     },
    //   },
    // },
    // RaFilterButton: {
    //   styleOverrides: {
    //     root: {
    //       marginRight: '1rem',
    //     },
    //   },
    // },
    RaPaginationActions: {
      styleOverrides: {
        currentPageButton: {
          border: '1px solid #b3b3b3',
        },
        // button: {
        //   backgroundColor: 'inherit',
        //   minWidth: 48,
        //   margin: '0 4px',
        //   border: '1px solid #282828',
        //   '@global': {
        //     '> .MuiButton-label': {
        //       padding: 0,
        //     },
        //   },
        // },
        actions: {
          '@global': {
            '.next-page': {
              marginLeft: 8,
              marginRight: 8,
            },
            '.previous-page': {
              marginRight: 8,
            },
          },
        },
      },
    },
    RaSidebar: {
      styleOverrides: {
        root: {
          height: 'initial',
        },
      },
    },

    RaSearchInput: {
      styleOverrides: {
        input: {
          paddingLeft: '.9rem',
          border: 0,
          '& .MuiInputBase-root': {
            backgroundColor: 'white !important',
            borderRadius: '20px !important',
            color: 'black',
            border: '0px',
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
            '& svg': {
              color: 'black !important',
            },

            '& .MuiOutlinedInput-input:-webkit-autofill': {
              borderRadius: '20px 0px 0px 20px',
              '-webkit-box-shadow': '0 0 0 100px #c2c1c2 inset',
              '-webkit-text-fill-color': 'black',
            },
          },
        },
      },
    },
  },

  player: {
    theme: 'dark',
  },
}


//  MuiFormGroup: {
//       root: {
//         color: spotifyGreen['500'],
//       },
//     },
//     MuiMenuItem: {
//       root: {
//         fontSize: '0.875rem',
//       },
//     },
//     MuiDivider: {
//       root: {
//         margin: '.75rem 0',
//       },
//     },
//     MuiDrawer: {
//       root: {
//         background: '#000',
//         paddingTop: '10px',
//       },
//     },
//     MuiButton: {
//       root: {
//         background: spotifyGreen['500'],
//         color: '#fff',
//         border: '1px solid transparent',
//         borderRadius: 500,
//         '&:hover': {
//           background: `${spotifyGreen['900']} !important`,
//         },
//       },
//       textSecondary: {
//         border: '1px solid #b3b3b3',
//         background: '#000',
//         '&:hover': {
//           border: '1px solid #fff !important',
//           background: '#000 !important',
//         },
//       },
//       label: {
//         color: '#fff',
//         paddingRight: '1rem',
//         paddingLeft: '0.7rem',
//       },
//     },
//     MuiDrawer: {
//       root: {
//         background: '#000',
//         paddingTop: '10px',
//       },
//     },
//     MuiTableRow: {
//       root: {
//         padding: '10px 0',
//         transition: 'background-color .3s ease',
//         '&:hover': {
//           backgroundColor: '#1d1d1d !important',
//         },
//         '@global': {
//           'td:nth-child(4)': {
//             color: '#fff !important',
//           },
//         },
//       },
//     },
//     MuiTableCell: {
//       root: {
//         borderBottom: '1px solid #1d1d1d',
//         padding: '10px !important',
//         color: '#b3b3b3 !important',
//       },
//       head: {
//         borderBottom: '1px solid #282828',
//         fontSize: '0.75rem',
//         textTransform: 'uppercase',
//         letterSpacing: 1.2,
//       },
//     },
//     // MuiAppBar: {
//     //   positionFixed: {
//     //     backgroundColor: '#000 !important',
//     //     boxShadow: 'none',
//     //   },
//     // },
//     NDAlbumGridView: {
//       albumName: {
//         marginTop: '0.5rem',
//         fontWeight: 700,
//         textTransform: 'none',
//         color: '#fff',
//       },
//       albumSubtitle: {
//         color: '#b3b3b3',
//       },
//       albumContainer: {
//         backgroundColor: '#181818',
//         borderRadius: '.5rem',
//         padding: '.75rem',
//         transition: 'background-color .3s ease',
//         '&:hover': {
//           backgroundColor: '#282828',
//         },
//       },
//       albumPlayButton: {
//         backgroundColor: spotifyGreen['500'],
//         borderRadius: '50%',
//         boxShadow: '0 8px 8px rgb(0 0 0 / 30%)',
//         padding: '0.35rem',
//         transition: 'padding .3s ease',
//         '&:hover': {
//           background: `${spotifyGreen['500']} !important`,
//           padding: '0.45rem',
//         },
//       },
//     },
//     NDPlaylistDetails: {
//       container: {
//         background: 'linear-gradient(#1d1d1d, transparent)',
//         borderRadius: 0,
//         paddingTop: '2.5rem !important',
//         boxShadow: 'none',
//       },
//       title: {
//         fontSize: 'calc(1.5rem + 1.5vw);',
//         fontWeight: 700,
//         color: '#fff',
//       },
//       details: {
//         fontSize: '.875rem',
//         minWidth: '75vw',
//         color: 'rgba(255,255,255, 0.8)',
//       },
//     },
//     NDAlbumDetails: {
//       root: {
//         background: 'linear-gradient(#1d1d1d, transparent)',
//         borderRadius: 0,
//         boxShadow: 'none',
//       },
//       cardContents: {
//         alignItems: 'center',
//         paddingTop: '1.5rem',
//       },
//       recordName: {
//         fontSize: 'calc(1rem + 1.5vw);',
//         fontWeight: 700,
//       },
//       recordArtist: {
//         fontSize: '.875rem',
//         fontWeight: 700,
//       },
//       recordMeta: {
//         fontSize: '.875rem',
//         color: 'rgba(255,255,255, 0.8)',
//       },
//       commentBlock: {
//         fontSize: '.875rem',
//         color: 'rgba(255,255,255, 0.8)',
//       },
//     },
//     NDAlbumShow: {
//       albumActions: musicListActions,
//     },
//     NDPlaylistShow: {
//       playlistActions: musicListActions,
//     },
//     NDAudioPlayer: {
//       audioTitle: {
//         color: '#fff',
//         fontSize: '0.875rem',
//       },
//       songTitle: {
//         fontWeight: 400,
//       },
//       songInfo: {
//         fontSize: '0.675rem',
//         color: '#b3b3b3',
//       },
//       player: {
//         border: '10px solid blue',
//       },
//     },
//     NDLogin: {
//       main: {
//         boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, .75)',
//       },
//       systemNameLink: {
//         color: '#fff',
//       },
//       card: {
//         border: '1px solid #282828',
//       },
//       avatar: {
//         marginBottom: 0,
//       },
//     },
//     RaLayout: {
//       content: {
//         padding: '0 !important',
//         background: 'linear-gradient(#171717, #121212)',
//       },
//     },
//     RaList: {
//       content: {
//         backgroundColor: 'inherit',
//       },
//     },
//     RaListToolbar: {
//       toolbar: {
//         padding: '0 .55rem !important',
//       },
//     },
//     '& .MuiInput-root': {
//       input: {
//         paddingLeft: '.9rem',
//         border: 0,
//         '& .MuiInputBase-root': {
//           backgroundColor: 'white !important',
//           borderRadius: '20px !important',
//           color: 'black',
//           border: '0px',
//           '& fieldset': {
//             borderColor: 'white',
//           },
//           '&:hover fieldset': {
//             borderColor: 'white',
//           },
//           '&.Mui-focused fieldset': {
//             borderColor: 'white',
//           },
//           '& svg': {
//             color: 'black !important',
//           },

//           '& .MuiOutlinedInput-input:-webkit-autofill': {
//             borderRadius: '20px 0px 0px 20px',
//             '-webkit-box-shadow': '0 0 0 100px #c2c1c2 inset',
//             '-webkit-text-fill-color': 'black',
//           },
//         },
//       },
//     },
//     RaFilter: {
//       form: {
//         '& .MuiOutlinedInput-input:-webkit-autofill': {
//           '-webkit-box-shadow': '0 0 0 100px #28282b inset',
//           '-webkit-text-fill-color': 'white',
//         },
//       },
//     },
//     RaFilterButton: {
//       root: {
//         marginRight: '1rem',
//       },
//     },
//     RaPaginationActions: {
//       currentPageButton: {
//         border: '1px solid #b3b3b3',
//       },
//       button: {
//         backgroundColor: 'inherit',
//         minWidth: 48,
//         margin: '0 4px',
//         border: '1px solid #282828',
//         '@global': {
//           '> .MuiButton-label': {
//             padding: 0,
//           },
//         },
//       },
//       actions: {
//         '@global': {
//           '.next-page': {
//             marginLeft: 8,
//             marginRight: 8,
//           },
//           '.previous-page': {
//             marginRight: 8,
//           },
//         },
//       },
//     },
//     RaSidebar: {
//       root: {
//         height: 'initial',
//       },
//     },