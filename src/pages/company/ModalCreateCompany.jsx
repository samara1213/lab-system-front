import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from '../../hooks';
import { MuiDialogCreate } from '../../components/MuiDialogCreate';

export const ModalCreateCompany = ({ openModal, handleCloseModalCreate }) => {

    const { com_nit, com_dv, com_telefono, com_name, com_direccion, com_correo, com_representante, formState, onInputChange, setformState } = useForm({
        com_nit: '',
        com_dv: '',
        com_telefono: '',
        com_name: '',
        com_direccion: '',
        com_correo: '',
        com_representante: '',

    });

    /**
     * Funcion principal para controlar el envio del formulario
     * @param {*} event 
     */
    const hadleSubmit = (event) => {

        event.preventDefault();

        registerCompany(formState);
    }

    /**
     * metodo que se encarga de realizar el insert en la base de datos
     * @param {*} formState 
     */
    const registerCompany = async (formState) => {

        console.log(formState);
        setformState({
            com_nit: '',
            com_dv: '',
            com_telefono: '',
            com_name: '',
            com_direccion: '',
            com_correo: '',
            com_representante: '',

        });
    }

    return (
        <>

            <MuiDialogCreate openModal={openModal}
                handleCloseModalCreate={handleCloseModalCreate}
                hadleSubmit={hadleSubmit}
                title={'Registro de Empresa'} >

                <Box component='form'
                    onSubmit={hadleSubmit}>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
                            <TextField
                                label='Nit de la empresa'
                                placeholder='Ingrese el numero de nit'
                                fullWidth
                                name='com_nit'
                                required
                                value={com_nit}
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
                            <TextField
                                label='Digito de verificacion'
                                fullWidth
                                name='com_dv'
                                type='number'
                                placeholder='Ingres el digito de verificacion'
                                value={com_dv}
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
                            <TextField
                                label='Telefono'
                                fullWidth
                                name='com_telefono'
                                required
                                value={com_telefono}
                                placeholder='Ingrese numero de telefono'
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                            <TextField
                                label='Nombre de la Empresa'
                                fullWidth
                                name='com_name'
                                required
                                value={com_name}
                                placeholder='Ingrese nombre de la empresa'
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                            <TextField
                                label='Direccion'
                                fullWidth
                                name='com_direccion'
                                required
                                value={com_direccion}
                                placeholder='Ingrese direccion de la empresa'
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                            <TextField
                                label='Correo Electrónico'
                                fullWidth
                                name='com_correo'
                                required
                                type='email'
                                value={com_correo}
                                placeholder='Ingrese correo de la empresa'
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
                            <TextField
                                label='Representante legal'
                                fullWidth
                                name='com_representante'
                                required
                                value={com_representante}
                                placeholder='Ingrese representante de la empresa'
                                onChange={onInputChange}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </MuiDialogCreate>
        </>
    )
}
