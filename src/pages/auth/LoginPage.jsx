import { LockOutlined } from "@mui/icons-material"
import { Avatar, Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useForm } from "../../hooks";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

  const navigate = useNavigate();

  const { email, password, formState, onInputChange } = useForm({
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {

    event.preventDefault();   
    loginUser(formState)
    
  }

  const loginUser = (formState) => {
      
    navigate(`/changePassword/${formState.email}`);

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
        <Typography component='h1' variant='h5' sx={{ textAlign: 'center' }}> Login</Typography>
        <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
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
