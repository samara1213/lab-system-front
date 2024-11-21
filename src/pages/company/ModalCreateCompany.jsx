import { Alert, Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useForm } from '../../hooks';
import { MuiDialogCreate } from '../../components/MuiDialogCreate';
import { useState } from 'react';
import { storeCompanyDB } from '../../services';
import Swal from 'sweetalert2';

const formValidations = {
    com_correo: [ (value) => value.includes('@'), 'El correo no es valido'],
    com_nit: [ (value) => value.length >= 1, 'El numero de nit es obligatorio'],
    com_telefono: [ (value) => value.length >= 1, 'El numero de telefono es obligatorio'],
    com_nombre: [ (value) => value.length >= 1, 'El nombre es obligatorio'],
    com_direccion: [ (value) => value.length >= 1, 'La direccion es obligatoria'],
    com_representante_legal: [ (value) => value.length >= 1, 'El representante es obligatorio'],
  }

export const ModalCreateCompany = ({ openModal, handleCloseModalCreate }) => {

    // objecto inical con los nombres de las columnas
    const initObject = {
        com_nit: '',
        com_dv: 1,
        com_telefono: '',
        com_nombre: '',
        com_direccion: '',
        com_correo: '',
        com_representante_legal: '',

    };

    const { com_nit,
        com_dv,
        com_telefono,
        com_nombre,
        com_direccion,
        com_correo,
        com_representante_legal,
        formState,
        onInputChange,
        isFormValid,
        com_correoValid,
        com_nitValid,
        com_telefonoValid,
        com_nombreValid,
        com_direccionValid,
        com_representante_legalValid,
        setformState } = useForm(initObject, formValidations);

    const [selectedEstado, setSelectedEstado] = useState('ACTIVO');
    const [onError, setOnError] = useState({
        openAlert: false,
        errorMessage: '',
    });
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (event) => {

        setSelectedEstado(event.target.value);

    };

    /**
     * Funcion principal para controlar el envio del formulario
     * @param {*} event 
     */
    const hadleSubmit = (event) => {

        event.preventDefault();
        setFormSubmitted(true);
     
        // validamos si el formulario es valido si no etonces no hacemos nada
        if ( !isFormValid ) return;

        setOnError({
            openAlert: false,
            errorMessage: '',
        })

        registerCompany(formState);
    }

    /**
     * metodo que se encarga de realizar el insert en la base de datos
     * @param {*} formState 
     */
    const registerCompany = async (formState) => {

        try {

            // preparamos el objecto a enviar
            const objCompany = {
                ...formState,
                com_estado: selectedEstado,
            };

            const { data } = await storeCompanyDB(objCompany);

            // cierro el modal
            handleCloseModalCreate()

            // mensaje de notificacion
            Swal.fire({
                title: 'Guardar empresa',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'Aceptar'
              })

            // se limpian las cajas
            setformState(initObject)

        } catch (error) {

            setOnError({
                openAlert: true,
                errorMessage: 'Se presento un error al crear la empresa'
            });

            console.log("**** ERROR CREANDO EMPRESAS ****");
            console.error(error);
            console.log("**** FIN ERROR CREANDO EMPRESAS ****");
        }

    }

    return (
        <>

            <MuiDialogCreate openModal={openModal}
                handleCloseModalCreate={handleCloseModalCreate}
                hadleSubmit={hadleSubmit}
                title={'Registro de Empresa'} >

                <Box component='form'
                    onSubmit={hadleSubmit}>
                    {onError.openAlert && <Alert sx={{ mt: 1, mb: 2 }} variant="filled" severity="error">
                        {onError.errorMessage}
                    </Alert>}
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 4 }}>
                            <TextField
                                label='Nit de la empresa'
                                placeholder='Ingrese el numero de nit'
                                fullWidth
                                name='com_nit'
                                required
                                value={com_nit}
                                error={ !!com_nitValid && formSubmitted}
                                helperText={ !!com_nitValid && formSubmitted ? com_nitValid: '' }
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
                                error={ !!com_telefonoValid && formSubmitted}
                                helperText={ !!com_telefonoValid && formSubmitted ? com_telefonoValid: '' }
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
                                error={ !!com_nombreValid && formSubmitted}
                                helperText={ !!com_nombreValid && formSubmitted ? com_nombreValid: '' }
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
                                error={ !!com_direccionValid && formSubmitted}
                                helperText={ !!com_direccionValid && formSubmitted ? com_direccionValid: '' }
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
                                error={ !!com_correoValid && formSubmitted}
                                helperText={ !!com_correoValid && formSubmitted ? com_correoValid: '' }
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                            <TextField
                                label='Representante legal'
                                fullWidth
                                name='com_representante_legal'
                                required
                                value={com_representante_legal}
                                placeholder='Ingrese representante de la empresa'
                                error={ !!com_representante_legalValid && formSubmitted}
                                helperText={ !!com_representante_legalValid && formSubmitted ? com_representante_legalValid: '' }
                                onChange={onInputChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
                            <FormControl fullWidth>
                                <InputLabel id="select-estado">Estado</InputLabel>
                                <Select
                                    labelId="select-estado"
                                    value={selectedEstado}
                                    label="estado"
                                    onChange={handleChange}
                                >
                                    <MenuItem value='ACTIVO'>ACTIVO</MenuItem>
                                    <MenuItem value='INACTIVO'>INACTIVO</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
            </MuiDialogCreate>    
        </>
    )
}
