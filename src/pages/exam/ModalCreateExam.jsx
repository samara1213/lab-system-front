import { Box, TextField } from "@mui/material"
import { MuiDialogCreate } from "../../components/MuiDialogCreate"
import Grid from '@mui/material/Grid2';
import { useForm } from "react-hook-form";
import { MuiErrorValidateForm } from "../../components/MuiErrorValidateForm";

export const ModalCreateExam = ({ openModal, handleCloseModalCreate, reloadTable }) => {

    // validaciones del formulario
    const { register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            exa_name: '',
            exa_description: '',
        }
    });

    /**
     * funcion que se encarga de registrar un examen
     */
    const registerExam = (data) => {

        console.log(data)
        reset();
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
                    </Grid>

                </Box>

            </MuiDialogCreate>
        </>
    )
}
