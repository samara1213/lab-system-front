import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';


const theme = createTheme({
  palette: {
    
    primary: {
      main: '#18202b',
    },
    secondary: {
      main: '#f50057',
    },
  }
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline/>
          <App/>
      </BrowserRouter>    
    </ThemeProvider>
  </StrictMode>
)
