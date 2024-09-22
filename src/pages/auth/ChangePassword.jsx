import { useParams } from "react-router-dom"
import { useForm } from "../../hooks";
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

export const ChangePassword = () => {
    
    // se  Obtiene el correo enviado por parametro para el cambio de contraseña
    const {email} =  useParams();

    const { oldPassword, newPassword, formState, onInputChange } = useForm({
        oldPassword: '',
        newPassword: '',
      });
    
      const handleSubmit = (event) => {
        event.preventDefault();
      
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
        <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
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
