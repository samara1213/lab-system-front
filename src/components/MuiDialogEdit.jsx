import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';


export const MuiDialogEdit = ({ children, openModalEdit, handleCloseModalEdit, hadleSubmitEdit, title }) => {
    return (
        <>
            <Dialog
                open={ openModalEdit }
                onClose={ handleCloseModalEdit }
                maxWidth='lg'
                fullWidth            
            >
                <DialogTitle>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant='h5'>{ title }</Typography>
                        <IconButton sx={{ color: 'red' }}
                            onClick={ handleCloseModalEdit }>
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
                        onClick={ handleCloseModalEdit }>
                        <Typography>Cancelar</Typography>
                    </Button>
                    <Button onClick={ hadleSubmitEdit } color='primary' variant='contained'>
                        <Typography>Actualizar</Typography>
                    </Button>
                </DialogActions>
            </Dialog>
        </>

    )
}
