import { Box, Checkbox, TextField, Typography } from "@mui/material"
import { MuiDialogCreate } from "../../components/MuiDialogCreate"
import Grid from '@mui/material/Grid2';
import { useForm } from "react-hook-form";
import { MuiErrorValidateForm } from "../../components/MuiErrorValidateForm";
import { pink } from "@mui/material/colors";
import { useState } from "react";
import { storeExamenDB } from "../../services";
import { useUserStore } from "../../hooks/useUserStore";
import Swal from 'sweetalert2';

export const ModalCreateExam = ({ openModal, handleCloseModalCreate, reloadTable }) => {
   
    // consultamos los datos del usuario que estan guardados en redux
    const { userInfo } = useUserStore();

    // validaciones del formulario
    const { register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            exa_name: '',
            exa_description: '',
            exa_convenius_name: '',
        }
    });

    const [isConvenio, setIsConvenio] = useState(false);
 
    /**
     * funcion que se encarga de registrar un examen
     */
    const registerExam = async (data) => {

        const modalTitle = 'Crear Tipo de examen';

        try {

            // realizamos  el registro en la base de datos
            const response = await storeExamenDB({
                ...data,
                exa_companie: isConvenio ? userInfo.company.com_id : '',
            })

            // mensaje de notificacion
            Swal.fire({
                title: modalTitle,
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'Aceptar'
            });

            // recargamos la tabla
            reloadTable();

        } catch (error) {

            // procesamos el error
            const { response } = error;

            console.log("**** ERROR CREANDO CLIENTES ****");
            console.error(response);
            console.log("**** FIN ERROR CREANDO CLIENTES ****");

            let errorMessage = 'Se presento un error creando el registro';
            
            // verifica ai viene error del backend
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }

            Swal.fire({
                title: modalTitle,
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });

        } finally {

            // reseteamos el formulario y cerramos el modal
            setIsConvenio(false)
            reset();
            handleCloseModalCreate(false);

        }
    }


    /**
     * Funcion que se encarga de obtner el control cuando se selecciona un convenio o 
     * @param {*} event 
     */
    const handleCheckConevio = (event) => {

        setIsConvenio(event.target.checked);

    }

    return (
        <>
            <MuiDialogCreate
                openModal={openModal}
                handleCloseModalCreate={handleCloseModalCreate}
                hadleSubmit={handleSubmit(registerExam)}
                title={'Registro de examen'}
            >
                <Box component='form' onSubmit={handleSubmit(registerExam)}>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                            <TextField
                                label='Nombre examen'
                                placeholder='Ingrese el nombre del examen'
                                fullWidth
                                required
                                error={!!errors.exa_name}
                                {...register('exa_name', {
                                    required: {
                                        value: true,
                                        message: 'El campo nombre examen no puede estar vacio'
                                    }
                                })}
                            />
                            <MuiErrorValidateForm error={errors.exa_name} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                            <TextField
                                label='Descripcion examen'
                                placeholder='Ingrese una descripcion para el examen'
                                fullWidth
                                required
                                error={!!errors.exa_description}
                                {...register('exa_description', {
                                    required: {
                                        value: true,
                                        message: 'El campo descripcion examen no puede estar vacio'
                                    }
                                })}
                            />
                            <MuiErrorValidateForm error={errors.exa_description} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                            <TextField
                                label='Valor examen'
                                placeholder='Ingrese un valor para el examen'
                                fullWidth
                                required
                                type="Number"
                                error={!!errors.exa_value}
                                {...register('exa_value', {
                                    required: {
                                        value: true,
                                        message: 'El campo valor examen no puede estar vacio'
                                    }
                                })}
                            />
                            <MuiErrorValidateForm error={errors.exa_value} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                            <Typography> Examen procesado con convenio ?:
                                <Checkbox
                                    sx={{
                                        color: pink[800],
                                        '&.Mui-checked': {
                                            color: pink[600],
                                        },
                                    }}
                                    onClick={handleCheckConevio}                                                             
                                /></Typography>
                        </Grid>
                        {
                            isConvenio &&
                            <Grid size={{ xs: 12, sm: 12, md: 8, lg: 8, xl: 8 }}>
                                <TextField
                                    label='Nombre convenio'
                                    placeholder='Ingrese el nombre convenio'
                                    fullWidth
                                    error={!!errors.exa_convenius_name}
                                    {...register('exa_convenius_name')}
                                />
                                <MuiErrorValidateForm error={errors.exa_convenius_name} />
                            </Grid>
                        }
                    </Grid>
                </Box>

            </MuiDialogCreate>
        </>
    )
}
