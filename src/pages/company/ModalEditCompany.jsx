import { Box, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useForm } from '../../hooks';
import { MuiDialogEdit } from '../../components/MuiDialogEdit';
import { useEffect } from 'react';

export const ModalEditCompany = ({ openModalEdit, handleCloseModalEdit, dataEdit }) => {
    
    const { com_nit, com_dv, com_telefono, com_nombre, com_direccion, com_correo, com_representante_legal, formState, onInputChange, setformState } = useForm({
        com_nit: dataEdit?.com_nit || '', // Asegúrate de usar un valor por defecto
        com_dv: dataEdit?.com_dv || '',
        com_telefono: dataEdit?.com_telefono || '',
        com_nombre: dataEdit?.com_nombre || '',
        com_direccion: dataEdit?.com_direccion || '',
        com_correo: dataEdit?.com_correo || '',
        com_representante_legal: dataEdit?.com_representante_legal || '',

    });

    /**
     * Funcion principal para controlar el envio del formulario
     * @param {*} event 
     */
    const hadleSubmitEdit = (event) => {

        event.preventDefault();

        editCompany(formState);
    }

    /**
     * metodo que se encarga de realizar el insert en la base de datos
     * @param {*} formState 
     */
    const editCompany = async (formState) => {

        setformState({
            com_nit: '',
            com_dv: '',
            com_telefono: '',
            com_nombre: '',
            com_direccion: '',
            com_correo: '',
            com_representante_legal: '',

        });
    }

    /**
     * Funcion encargada de asignar a las cajas de texto llos valores correpondientes a 
     * los registros a editar
     */
    useEffect(() => {
        
        if(dataEdit) {

            setformState({
                com_nit : dataEdit.com_nit,
                com_dv: null !== dataEdit.com_dv ? dataEdit.com_dv : '',
                com_telefono: dataEdit.com_telefono,
                com_nombre: dataEdit.com_nombre,
                com_direccion: dataEdit.com_direccion,
                com_correo: dataEdit.com_correo,
                com_representante_legal: dataEdit.com_representante_legal,
        
            });
        }   
    
    }, [dataEdit]);    

    return (
        <>

            <MuiDialogEdit openModalEdit={openModalEdit}
                handleCloseModalEdit={handleCloseModalEdit}
                hadleSubmitEdit={hadleSubmitEdit}
                title={'Editar Empresa'} >

                <Box component='form'
                    onSubmit={hadleSubmitEdit}>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
                            <TextField
                                label='Nit de la empresa'
                                placeholder='Ingrese el numero de nit'
                                fullWidth
                                name='com_nit'
                                disabled
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
                                name='com_nombre'
                                required
                                value={com_nombre}
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
                                name='com_representante_legal'
                                required
                                value={com_representante_legal}
                                placeholder='Ingrese representante de la empresa'
                                onChange={onInputChange}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </MuiDialogEdit>
        </>
    )
}
