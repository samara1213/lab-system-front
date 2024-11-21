import React, { useEffect, useState } from 'react'
import { MuiDialogEdit } from '../../components/MuiDialogEdit'
import { Alert, Box, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useForm } from '../../hooks';
import { updateCustomerDB } from '../../services';
import Swal from 'sweetalert2';

const formValidations = {
  cus_numero_doc: [(value) => value.length >= 1, 'El numero de documento no es valido'],
  cus_primer_apellido: [(value) => value.length >= 1, 'El Primer apellido es obligatorio'],
  cus_primer_nombre: [(value) => value.length >= 1, 'El Primer nombre es obligatorio'],
  cus_direccion: [(value) => value.length >= 1, 'La direccion es obligatoria'],
  cus_telefono: [(value) => value.length >= 1, 'el Telefono es obligatorio'],
  cus_correo: [(value) => value.includes('@'), 'El correo no es valido'],
}

export const ModalEditCustomer = ({ openModalEdit, handleCloseModalEdit, dataEdit }) => {

  // objecto inical con los nombres de las columnas
  const initObject = {
    cus_numero_doc: '',
    cus_primer_apellido: '',
    cus_segundo_apellido: '',
    cus_primer_nombre: '',
    cus_segundo_nombre: '',
    cus_direccion: '',
    cus_telefono: '',
    cus_correo: '',
  };

  const { cus_numero_doc,
    cus_primer_apellido,
    cus_segundo_apellido,
    cus_primer_nombre,
    cus_segundo_nombre,
    cus_direccion,
    cus_telefono,
    cus_correo,
    formState,
    onInputChange,
    setformState,
    isFormValid,
    cus_numero_docValid,
    cus_primer_apellidoValid,
    cus_primer_nombreValid,
    cus_direccionValid,
    cus_telefonoValid,
    cus_correoValid } = useForm({
      cus_numero_doc: dataEdit?.cus_numero_doc || '',
      cus_primer_apellido: dataEdit?.cus_primer_apellido || '',
      cus_segundo_apellido: dataEdit?.cus_segundo_apellido || '',
      cus_primer_nombre: dataEdit?.cus_primer_nombre || '',
      cus_segundo_nombre: dataEdit?.cus_segundo_nombre || '',
      cus_direccion: dataEdit?.cus_direccion || '',
      cus_telefono: dataEdit?.cus_telefono || '',
      cus_correo: dataEdit?.cus_correo || '',

    }, formValidations);

  // inicio de los useSates
  const [selectTypeDoc, setSelectTypeDoc] = useState('');
  const [selectGenero, setSelectGenero] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs(dataEdit?.cus_fecha_nacimiento || null));
  const [onError, setOnError] = useState({
    openAlert: false,
    errorMessage: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  /**
   * funcion que se encarga de obtner el control cuando
   * se selecciona un tipo de documento
   * @param {*} event 
   */
  const handleChange = (event) => {

    setSelectTypeDoc(event.target.value);

  };

  /**
   * funcion para controlar cuando se selecciona el genero
   * @param {*} event 
   */
  const handleChangeGenero = (event) => {

    setSelectGenero(event.target.value);

  };

  /**
   * Funcion que se encarga de validar si la fecha de nacimiento no es mayor que la actual
   * @returns 
   */
  const handleValidateDate = () => {

    // ontenemos la fecha actual
    const currenDate = dayjs()

    // valido que se hubiera selecconado la fecha de nacimiento
    if (!selectedDate) return true;

    // validamos si la fecha seleccionada es mayor que la fecha actual
    if (selectedDate && selectedDate.isAfter(currenDate, 'day')) {

      setOnError({
        openAlert: true,
        errorMessage: 'La fecha seleccionada no puede ser mayor que la fecha actual',
      })

      return true;
    }

    return false;


  }

  /**
   * Funcion principal para controlar el envio del formulario
   * @param {*} event 
   */
  const hadleSubmitEdit = (event) => {

    event.preventDefault();
    setFormSubmitted(true);
    // validamos si el formulario es valido de lo contrario no permitimos continuar
    if (!isFormValid) return;

    // se limipia el mensaje de errro
    setOnError({
      openAlert: false,
      errorMessage: '',
    })

    // validamos si la  fecha en invalida
    if (handleValidateDate()) return;

    // actualizamos el cliente en la base de datos
    updateCustomer(formState);


  }


  /**
  * Funcion que se enccarga de realizar el envio de la infromacion 
  * a crear el cliente en la base de datos
  */
  const updateCustomer = async (formState) => {

    try {

      // construimos nuestro obejcto a enviar
      const objCustomer = {
        ...formState,
        cus_tipo_doc: selectTypeDoc,
        cus_genero: selectGenero,
        cus_fecha_nacimiento: dayjs(selectedDate).format('YYYY-MM-DD')
      }

      // actualizamos el cliente en la base de datos
      const { data } = await updateCustomerDB(dataEdit.id, objCustomer);

      // se limpian las cajas
      setformState(initObject)

      // cierro el modal
      handleCloseModalEdit()

      // mensaje de notificacion
      Swal.fire({
        title: 'Actualizacion Cliente',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });

    } catch (error) {

      const { response } = error;

      console.log("**** ERROR ACTUALIZANDO CLIENTES ****");
      console.error(response);
      console.log("**** FIN ERROR ACTUALIZANDO CLIENTES ****");

      // verificamos si el error presentado es de validaciones
      if (Array.isArray(response.data.message)) {

        // agregamos el mensaje de error
        setOnError({
          openAlert: true,
          errorMessage: 'El Formulario contiene datos incorrectos',
        });

        return;

      }

      // validamos si el error es por duplicidad
      if (400 === response.status) {

        setOnError({
          openAlert: true,
          errorMessage: response.data.message,
        });

        return;
      }

      // si no es ningun error el del anterior
      setOnError({
        openAlert: true,
        errorMessage: 'Error del sistema contacte al administrador ',
      });

    }

  }

  /**
   * Funcion encargada de asignar a las cajas de texto llos valores correpondientes a 
   * los registros a editar
   */
  useEffect(() => {

    if (dataEdit) {

      setformState({
        cus_numero_doc: dataEdit.cus_numero_doc,
        cus_primer_apellido: dataEdit.cus_primer_apellido,
        cus_segundo_apellido: dataEdit.cus_segundo_apellido,
        cus_primer_nombre: dataEdit.cus_primer_nombre,
        cus_segundo_nombre: dataEdit.cus_segundo_nombre,
        cus_direccion: dataEdit.cus_direccion,
        cus_telefono: dataEdit.cus_telefono,
        cus_correo: dataEdit.cus_correo,

      });
      setSelectGenero(dataEdit.cus_genero);
      setSelectTypeDoc(dataEdit.cus_tipo_doc);
      setSelectedDate(dayjs(dataEdit.cus_fecha_nacimiento));

    }

  }, [dataEdit]);

  return (
    <>
      <MuiDialogEdit
        openModalEdit={openModalEdit}
        handleCloseModalEdit={handleCloseModalEdit}
        hadleSubmitEdit={hadleSubmitEdit}
        title={'Actualizaciòn Cliente'}

      >
        <Box component='form'
          onSubmit={hadleSubmitEdit}>
          {onError.openAlert && <Alert sx={{ mt: 1, mb: 2 }} variant="filled" severity="error">
            {onError.errorMessage}
          </Alert>}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="select-type-doc">Tipo de documento</InputLabel>
                <Select
                  labelId="select-type-doc"
                  value={selectTypeDoc}
                  label="Tipo de documento"
                  onChange={handleChange}
                >
                  <MenuItem value='CC'>Cedula Ciudadania</MenuItem>
                  <MenuItem value='CE'>Cedula Extranjeria</MenuItem>
                  <MenuItem value='TI'>Tarjeta de Identidad</MenuItem>
                  <MenuItem value='RC'>Registro Civil</MenuItem>
                </Select>
              </FormControl>

            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <TextField
                label='Numero Documento'
                placeholder='Documento de identidad'
                fullWidth
                name='cus_numero_doc'
                required
                value={cus_numero_doc}
                onChange={onInputChange}
                error={!!cus_numero_docValid && formSubmitted}
                helperText={!!cus_numero_docValid && formSubmitted ? cus_numero_docValid : ''}
                disabled
              />

            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <TextField
                label='Primer Apellido'
                placeholder='Primer apellido'
                fullWidth
                name='cus_primer_apellido'
                required
                value={cus_primer_apellido}
                error={!!cus_primer_apellidoValid && formSubmitted}
                helperText={!!cus_primer_apellidoValid && formSubmitted ? cus_primer_apellidoValid : ''}
                onChange={onInputChange}
              />

            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <TextField
                label='Segundo Apellido'
                placeholder='Segundo apellido'
                fullWidth
                name='cus_segundo_apellido'
                value={cus_segundo_apellido}
                onChange={onInputChange}
              />

            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <TextField
                label='Primer Nombre'
                placeholder='Primer Nombre'
                fullWidth
                name='cus_primer_nombre'
                required
                value={cus_primer_nombre}
                error={!!cus_primer_nombreValid && formSubmitted}
                helperText={!!cus_primer_nombreValid && formSubmitted ? cus_primer_nombreValid : ''}
                onChange={onInputChange}
              />

            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <TextField
                label='Segundo Nombre'
                placeholder='Segundo Nombre'
                fullWidth
                name='cus_segundo_nombre'
                value={cus_segundo_nombre}
                onChange={onInputChange}
              />

            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <TextField
                label='Direccion'
                placeholder='Direccion'
                fullWidth
                name='cus_direccion'
                required
                value={cus_direccion}
                error={!!cus_direccionValid && formSubmitted}
                helperText={!!cus_direccionValid && formSubmitted ? cus_direccionValid : ''}
                onChange={onInputChange}
              />

            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="select-genero">Genero</InputLabel>
                <Select
                  labelId="select-genero"
                  value={selectGenero}
                  label="Genero"
                  onChange={handleChangeGenero}
                >
                  <MenuItem value='M'>Masculino</MenuItem>
                  <MenuItem value='F'>Femenino</MenuItem>
                  <MenuItem value='O'>Otro</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Selecciona una fecha"
                  value={selectedDate}
                  onChange={(newDate) => setSelectedDate(newDate)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                    },
                  }}

                />
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <TextField
                label='Telefono'
                placeholder='Telefono'
                fullWidth
                name='cus_telefono'
                required
                value={cus_telefono}
                error={!!cus_telefonoValid && formSubmitted}
                helperText={!!cus_telefonoValid && formSubmitted ? cus_telefonoValid : ''}
                onChange={onInputChange}
              />

            </Grid>
            <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
              <TextField
                label='Correo'
                placeholder='Correo'
                fullWidth
                name='cus_correo'
                required
                value={cus_correo}
                error={!!cus_correoValid && formSubmitted}
                helperText={!!cus_correoValid && formSubmitted ? cus_correoValid : ''}
                onChange={onInputChange}
                type="email"
              />

            </Grid>
          </Grid>
        </Box>

      </MuiDialogEdit>
    </>
  )
}
