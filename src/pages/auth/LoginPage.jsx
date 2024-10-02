import { LockOutlined } from "@mui/icons-material"
import { Alert, Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useForm } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { loginUserDB } from "../../services";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useState } from "react";

export const LoginPage = () => {

  const navigate = useNavigate();

  const { startLogin } = useAuthStore();

  const { email, password, formState, onInputChange } = useForm({
    email: '',
    password: '',
  });

  const [onError, setOnError] = useState({
    openAlert: false,
    errorMessage: '',
  });

  /**
   * funcion para el envio de formulario de autenticacion
   * @param {*} event 
   */
  const handleSubmit = (event) => {

    event.preventDefault();
    setOnError({
      openAlert: false,
      errorMessage: '',
    })

    loginUser(formState);

  }


  /**
   * funcion que se encarga de realizar el login de la aplicacion
   * 
   * @param {*} data 
   */
  const loginUser = async (data) => {

    try {

      // se realiza la consulta a la base de datos
      const result = await loginUserDB(data.email, data.password);

      // varificamos si el ussuario tiene que cambiar de contraseña por primer ingreso
      if (result.data.data.use_primer_ingreso) {

        // redirijimos a la pagina de cambio de  contraseña
        return navigate(`/changePassword/${formState.email}`);

      }

      // marcamos el ussuario como autenticado y guardamos los datos del usuario en redux
      startLogin(result.data);

    } catch (error) {

      setOnError({
        openAlert: true,
        errorMessage: 'Usuario y/ò contraseña no valido'
      });

      console.log(error);

    }


  }

  return (
    <>
      <Container maxWidth='xs'>
        <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
          <Avatar sx={{
            mx: 'auto',
            bgcolor: 'secondary.main',
            textAlign: 'center',
            mb: 1
          }}>
            <LockOutlined />
          </Avatar>
          <Typography component='h1' variant='h5' sx={{ textAlign: 'center' }}> Login</Typography>
          {onError.openAlert && <Alert fullWidth sx={{ mt: 1, mb: 2 }} variant="filled" severity="error">
            {onError.errorMessage}
          </Alert>}
          <Box
            component='form'
            onSubmit={handleSubmit}            
            sx={{ mt: 1 }}>
            <TextField
              label="Correo"
              type="email"
              name='email'
              placeholder='Ingrese su usuario'
              fullWidth
              required
              autoFocus
              sx={{ mb: 2 }}
              onChange={onInputChange}
              value={formState.email}>
            </TextField>
            <TextField
              label="Contraseña"
              type="password"
              name='password'
              placeholder='Ingrese su contraseña'
              fullWidth
              required
              autoFocus
              sx={{ mb: 2 }}
              onChange={onInputChange}
              value={formState.password}>
            </TextField>
            <Button type='submit' variant='contained' fullWidth sx={{ mt: 1 }}>
              Iniciar Sesiòn
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  )
}
