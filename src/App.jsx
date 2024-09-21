import { useState } from 'react'
import { NavBar } from './components/NavBar';
import { Container } from '@mui/material';
import { AppRoutes } from './routes/AppRoutes';
import { AutenticatedRoutes } from './routes/AutenticatedRoutes';

export const App = () => {
  const [count, setCount] = useState(0);

  const autenticated = 'autenticated';

  return (
    <>
    {
      ( autenticated === 'autenticated' ) ?
        (
          <>
            <NavBar/>
            <Container sx={{mt: 5}}>
              <AppRoutes/>
            </Container>
          </>
        )
      : (
        <>
          <AutenticatedRoutes/>
        </>
      )
    }     
    </>
  )
}


