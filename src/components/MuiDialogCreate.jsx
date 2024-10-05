import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';


export const MuiDialogCreate = ({ children, openModal, handleCloseModalCreate, hadleSubmit, title }) => {
    return (
        <>
            <Dialog
                open={ openModal }
                onClose={ handleCloseModalCreate }
                maxWidth='lg'
                fullWidth            
            >
                <DialogTitle>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant='h5'>{ title }</Typography>
                        <IconButton sx={{ color: 'red' }}
                            onClick={ handleCloseModalCreate }>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions sx={{ mr: 2, mb: 2 }}>
                    <Button sx={{backgroundColor: 'tertiary.main'}}
                        variant='contained'
                        onClick={ handleCloseModalCreate }>
                        <Typography>Cancelar</Typography>
                    </Button>
                    <Button onClick={ hadleSubmit } color='primary' variant='contained'>
                        <Typography>Registrar</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}
