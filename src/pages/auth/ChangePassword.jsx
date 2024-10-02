import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "../../hooks";
import { Alert, Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { changePasswordDB } from "../../services/authService";
import { useState } from "react";

export const ChangePassword = () => {
    
    // se  Obtiene el correo enviado por parametro para el cambio de contraseña
    const {email} =  useParams();

    const navigate = useNavigate();

    const { oldPassword, newPassword, formState, onInputChange } = useForm({
        oldPassword: '',
        newPassword: '',
      });
    
    const [onError, setOnError] = useState({
        openAlert: false,
        errorMessage: '',
      });

    /**
     * funcion que se encarga d realizar el cambio de contraseña
     * @param {*} event 
     */
    const handleSubmit = (event) => {

      event.preventDefault();

      setOnError({
        openAlert: false,
        errorMessage: ''
      });

      // datos del cambio de contraseña
      const dataUser = {

          use_correo: email,
          use_old_contrasena: oldPassword,
          use_new_contrasena: newPassword

      }

      // ejecutamos el cambio de contraseña
      changePassword(dataUser);      
    }
    
    /**
     * funcion que se encarga de realizar el cambio de contraseña del ussuario
     * @param {*} dataUser 
     * @returns 
     */
    const changePassword = async(dataUser) => {

      try {

        // se realiza el cambio de contraseña
        const { data } = await changePasswordDB(dataUser);

        // regresamos a la pagina de inicio para volver a ingresar
        return navigate(`/`);
        
      } catch (error) {

        setOnError({
          openAlert: true,
          errorMessage: 'Cambio de contraseña invalido'
        });

        console.log(error)
        
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
          <LockOutlined/>
        </Avatar>
        <Typography component='h1' variant='h5' sx={{ textAlign: 'center' }}> Cambio Contraseña</Typography>
        {onError.openAlert && <Alert fullWidth sx={{ mt: 1, mb: 2 }} variant="filled" severity="error">
            {onError.errorMessage}
          </Alert>}
        <Box
            component='form'
            onSubmit={handleSubmit}            
            sx={{ mt: 1 }}>
            <TextField
              label="Contraseña anterior"
              type="password"
              name='oldPassword'
              placeholder='Ingrese su contraseña anterior'
              fullWidth
              required
              autoFocus
              sx={{ mb: 2 }}
              onChange={onInputChange}
              value={formState.oldPassword}>
            </TextField>
            <TextField
              label="Nueva contraseña"
              type="password"
              name='newPassword'
              placeholder='Ingrese su contraseña nueva'
              fullWidth
              required
              autoFocus
              sx={{ mb: 2 }}
              onChange={onInputChange}
              value={formState.newPassword}>
            </TextField>
            <Button type='submit' variant='contained' fullWidth sx={{ mt: 1 }}>
              Cambiar contraseña
            </Button>
          </Box>
      </Paper>
    </Container>
    </>
  )
}
