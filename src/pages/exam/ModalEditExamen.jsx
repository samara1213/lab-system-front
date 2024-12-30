import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { MuiDialogEdit } from "../../components/MuiDialogEdit";
import { Box, Checkbox, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import { MuiErrorValidateForm } from "../../components/MuiErrorValidateForm";
import { pink } from "@mui/material/colors";
import Swal from 'sweetalert2';
import { updateExamenDB } from "../../services";

export const ModalEditExamen = ({ openModalEdit, handleCloseModalEdit, dataEdit }) => {

  const [isConvenio, setIsConvenio] = useState(false)
  // validaciones del formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  /**
   * funcion que se encarga de realizar el proceso de actualizacion de registro
   * @param {*} data 
   */
  const updateExamen = async (data) => {

    const modalTitle = 'Editar Tipo de examen';
    
    try {

      // Objecto tenporal con los datos a insertar
      const tmpData = {
        exa_name: data.exa_name,
        exa_description: data.exa_description,
        exa_price: +data.exa_price,
        exa_companie: dataEdit.exa_companie,
        exa_convenius: isConvenio,
        exa_convenius_name: isConvenio ? data.exa_convenius_name : '',
      };

      // realizamos la actualizacion en la base de datos
      const response = await updateExamenDB(dataEdit.id, tmpData);

      // mensaje de notificacion
      Swal.fire({
        title: modalTitle,
        text: response.data.message,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

    } catch (error) {

      // procesamos el error
      const { response } = error;

      console.log("**** ERROR EDITANDO EXAMENES ****");
      console.error(response);
      console.log("**** FIN ERROR EDITANDO EXAMENES ****");

      let errorMessage = 'Se presento un error editando el registro';

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

      // reseteamos todos lo valores para el formulario de editar
      setIsConvenio(false)
      reset()
      handleCloseModalEdit(false);
    }
  }

  /**
 * Funcion que se encarga de obtner el control cuando se selecciona un convenio o 
 * @param {*} event 
 */
  const handleCheckConevio = (event) => {

    setIsConvenio(event.target.checked);

  }
  /**
   * funcion que se encarga de actualizar la data cuando esta cambia
   */
  useEffect(() => {

    // verificar que exiatan el registro
    if (dataEdit !== null) {

       reset(dataEdit)
      setIsConvenio(dataEdit.exa_convenius); 
    }
  
  }, [dataEdit])

  return (
    <>
      <MuiDialogEdit
        openModalEdit={openModalEdit}
        handleCloseModalEdit={handleCloseModalEdit}
        hadleSubmitEdit={handleSubmit(updateExamen)}
        title={'Editar examen'}
      >
        <Box component='form' onSubmit={updateExamen}>
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
                type='number'
                error={!!errors.exa_price}
                {...register('exa_price', {
                  required: {
                    value: true,
                    message: 'El campo valor examen no puede estar vacio'
                  }
                })}
              />
              <MuiErrorValidateForm error={errors.exa_price} />
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
      </MuiDialogEdit>
    </>
  )
}
