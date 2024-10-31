import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { MuiDialogCreate } from "../../components/MuiDialogCreate"
import Grid from '@mui/material/Grid2';
import { useState } from "react";
import { useForm } from "../../hooks";

export const ModalCreateCustomer = ({ openModal, handleCloseModalCreate }) => {
    
    // objecto inical con los nombres de las columnas
    const initObject = {
        cus_numero_doc: '',
        cus_primer_apellido: '',
        cus_segundo_apellido: '',
        cus_primer_nombre: '',
        cus_segundo_nombre: '',
        cus_direccion: '',
    };

    const { cus_numero_doc,
        cus_primer_apellido,
        cus_segundo_apellido,
        cus_primer_nombre,
        cus_segundo_nombre,
        cus_direccion,
        formState,
        onInputChange,
        setformState } = useForm(initObject);

    const [selectTypeDoc, setSelectTypeDoc] = useState('CC');
    const [selectGenero, setSelectGenero] = useState('M')

    const handleChange = (event) => {

        setSelectTypeDoc(event.target.value);

    };

    const handleChangeGenero = (event) => {

        setSelectGenero(event.target.value);

    };

    return (
        <>
            <MuiDialogCreate
                openModal={openModal}
                handleCloseModalCreate={handleCloseModalCreate}
                //hadleSubmit={hadleSubmit}
                title={'Registro de Cliente'}
            >
                <Box component='form'>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4}}>
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
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4}}>
                            <TextField
                                label='Numero Documento'
                                placeholder='Documento de identidad'
                                fullWidth
                                name='cus_numero_doc'
                                required
                                value={cus_numero_doc}
                                onChange={onInputChange}
                            />

                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4}}>
                            <TextField
                                label='Primer Apellido'
                                placeholder='Primer apellido'
                                fullWidth
                                name='cus_primer_apellido'
                                required
                                value={cus_primer_apellido}
                                onChange={onInputChange}
                            />

                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4}}>
                            <TextField
                                label='Segundo Apellido'
                                placeholder='Segundo apellido'
                                fullWidth
                                name='cus_segundo_apellido'                        
                                value={cus_segundo_apellido}
                                onChange={onInputChange}
                            />

                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4}}>
                            <TextField
                                label='Primer Nombre'
                                placeholder='Primer Nombre'
                                fullWidth
                                name='cus_primer_nombre'
                                required
                                value={cus_primer_nombre}
                                onChange={onInputChange}
                            />

                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4}}>
                            <TextField
                                label='Segundo Nombre'
                                placeholder='Segundo Nombre'
                                fullWidth
                                name='cus_segundo_nombre'                                
                                value={cus_segundo_nombre}
                                onChange={onInputChange}
                            />

                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4}}>
                            <TextField
                                label='Direccion'
                                placeholder='Direccion'
                                fullWidth
                                name='cus_direccion'
                                required                                
                                value={cus_direccion}
                                onChange={onInputChange}
                            />

                        </Grid>
                        <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4}}>
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
                    </Grid>
                </Box>
            </MuiDialogCreate>
        </>
    )
}
