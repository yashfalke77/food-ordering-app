import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import '../styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Provider } from 'react-redux'
import store from '../redux/configureStore'

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });


function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    typography: {
      fontFamily: [
        "Gilroy",
        "sans-serif",
      ].join(','),
      fontWeight: 500,
    },
    palette: {
      bg_color: createColor('#ac0101'),
    },
  });

  return (
    <>
      <Provider store={store}>
        <NavBar />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
        <Footer />
      </Provider>
    </>
  )
}

export default MyApp
