import { Alert, Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { useForm } from '../../hooks';
import { MuiDialogCreate } from '../../components/MuiDialogCreate';
import { useState } from 'react';
import { storeCompanyDB } from '../../services';
import { MuiNotificationSuccess } from '../../components/MuiNotificationSuccess';

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
        setformState } = useForm(initObject);

    const [selectedEstado, setSelectedEstado] = useState('ACTIVO');
    const [openNotificationSuccess, setOpenNotificationSuccess] = useState(false)
    const [messageNotification, setMessageNotification] = useState('')
    const [onError, setOnError] = useState({
        openAlert: false,
        errorMessage: '',
    });

    const handleChange = (event) => {

        setSelectedEstado(event.target.value);

    };

    /**
     * Funcion principal para controlar el envio del formulario
     * @param {*} event 
     */
    const hadleSubmit = (event) => {

        event.preventDefault();

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

            // se aggrega el mensaje 
            setMessageNotification(data.message);

            // se abre la notificacion de correcto
            setOpenNotificationSuccess(true);

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

    /**
     * Funcion que se encarga de cerrar la notificacion de success
     * @param {*} event 
     * @param {*} reason 
     */
    const handleCloseNotificationSuccess = (event, reason) => {

        if (ValidateCloseModal(reason)) {

            // cerramos la notificacion
            setOpenNotificationSuccess(false);

            //  cerramos el modal padre
            handleCloseModalCreate()
        }

    }

    /**
   * Funcion que se encarga de validar cuando un moddal esta abirto si se pica fuera de el
   * o si se oorime la tecla escape
   * @param {*} reason 
   * @returns 
   */
    const ValidateCloseModal = (reason) => (reason !== 'backdropClick' && reason !== 'escapeKeyDown');

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
                        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
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
            <MuiNotificationSuccess openNotification={openNotificationSuccess}
                handleCloseNotification={handleCloseNotificationSuccess}
                message={messageNotification} />
        </>
    )
}
