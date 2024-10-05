import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

export const MuiTitlePage = ({ title }) => {
    return (
        <>
            <Grid container>
                <Grid sx={{
                    bgcolor: 'primary.main',
                    borderRadius: 2
                }}
                    size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
                    <Typography variant='h6' sx={{
                                color: 'white',
                                m: 1
                    }}>
                        { title }
                    </Typography>
                </Grid>
            </Grid>
        </>

    )
}
