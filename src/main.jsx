import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './store';


const theme = createTheme({
  palette: {

    primary: {
      main: '#18202b',
    },
    secondary: {
      main: '#f50057',
    },
    tertiary: {
      main: '#FF5722', // Color terciario
    },
  }
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
)
