import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const MuiNotificationSuccess = ({ openNotification, handleCloseNotification, message }) => {
    return (
        <>
            <Dialog
                open={openNotification}
                onClose={handleCloseNotification}
                maxWidth='xs'
                fullWidth
            >
                <DialogTitle>
                <IconButton
                        color='inherit'
                        size='large'
                        edge='end'
                    >
                        <Avatar sx={{ bgcolor: 'green' }}>
                            <CheckCircleIcon sx={{ bgcolor: 'green' }} />
                        </Avatar>
                    </IconButton>            
                </DialogTitle>
                <DialogContent sx={{ ml: 2}}>
                    <Typography variant='h5'> {message} </Typography>
                </DialogContent>
                <DialogActions sx={{ mr: 2, mb: 2 }}>
                    <Button onClick={handleCloseNotification} color='primary' variant='contained'>
                        <Typography>Aceptar</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
