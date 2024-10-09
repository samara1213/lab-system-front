import { useEffect } from 'react'
import { NavBar } from './components/NavBar';
import { Container } from '@mui/material';
import { AppRoutes } from './routes/AppRoutes';
import { AutenticatedRoutes } from './routes/AutenticatedRoutes';
import { useAuthStore } from './hooks/useAuthStore';

export const App = () => {

  // se obtiene las funciones relacionadas con la autenticacion
  const { autenticaded, checkAuthToken } = useAuthStore();

  // realizamos la autenticacion del token
  useEffect(() => {
    
    // se ejecutra la funcion que actualiza el token
    checkAuthToken();

  }, [])


  return (
    <>
      {
        (autenticaded === 'autenticaded') ?
          (
            <>
              <NavBar />
              <Container sx={{ mt: 5 }}>
                <AppRoutes />
              </Container>
            </>
          )
          : (
            <>
              <AutenticatedRoutes />
            </>
          )
      }
    </>
  )
}


