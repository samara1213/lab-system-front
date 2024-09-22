import { Avatar, Box, Card, CardContent, Typography } from "@mui/material"
import PeopleIcon from '@mui/icons-material/People';
import Grid from '@mui/material/Grid2';

export const HomePage = () => {
  return (
    <Grid container spacing={2}>
      <Grid  size={{xs:12, sm:6 ,md:6 ,lg:3, xl:3}}> 
        <Card sx={{
          transition: "0.2s",
          "&:hover": {
            transform: "scale(1.05)",
          },
          display: 'flex',
          alignItems: 'center',
          borderRadius: 3,
          width: '100%'
        }}>
          <CardContent sx={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
            <Box>
            <Typography variant="body2" sx={{fontWeight: 'bold', color: '#673ab7'}}> Ingreso Pacientes</Typography>
            <Typography variant="h4" sx={{fontWeight: 'bold'}}>12</Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#673ab7'}}><PeopleIcon/></Avatar>
          </CardContent>
        </Card>
        </Grid>
        <Grid  size={{xs:12, sm:6 ,md:6 ,lg:3, xl:3}}>
        <Card sx={{
          transition: "0.2s",
          "&:hover": {
            transform: "scale(1.05)",
          },
          display: 'flex',
          alignItems: 'center',
          borderRadius: 3
        }}>
          <CardContent sx={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
            <Box>
            <Typography variant="body2" sx={{fontWeight: 'bold', color: '#673ab7'}}> Resultados pendientes</Typography>
            <Typography variant="h4" sx={{fontWeight: 'bold'}}>15</Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#673ab7'}}><PeopleIcon/></Avatar>
          </CardContent>
        </Card>
        </Grid>
        <Grid  size={{xs:12, sm:6 ,md:6 ,lg:3, xl:3}}>
        <Card sx={{
          transition: "0.2s",
          "&:hover": {
            transform: "scale(1.05)",
          },
          display: 'flex',
          alignItems: 'center',
          borderRadius: 3
        }}>
          <CardContent sx={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
            <Box>
            <Typography variant="body2" sx={{fontWeight: 'bold', color: '#673ab7'}}> Resultados pendientes</Typography>
            <Typography variant="h4" sx={{fontWeight: 'bold'}}>15</Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#673ab7'}}><PeopleIcon/></Avatar>
          </CardContent>
        </Card>
        </Grid>
        <Grid  size={{xs:12, sm:6 ,md:6 ,lg:3, xl:3}}>
        <Card sx={{
          transition: "0.2s",
          "&:hover": {
            transform: "scale(1.05)",
          },
          display: 'flex',
          alignItems: 'center',
          borderRadius: 3
        }}>
          <CardContent sx={{display: 'flex', alignItems: 'center', flexGrow: 1}}>
            <Box>
            <Typography variant="body2" sx={{fontWeight: 'bold', color: '#673ab7'}}> Resultados pendientes</Typography>
            <Typography variant="h4" sx={{fontWeight: 'bold'}}>15</Typography>
            </Box>
            <Avatar sx={{ bgcolor: '#673ab7'}}><PeopleIcon/></Avatar>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
