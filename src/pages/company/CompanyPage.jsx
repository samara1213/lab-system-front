
import { useState } from 'react'
import { ModalCreateCompany } from './ModalCreateCompany'
import { Box, Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MuiTableBasic } from '../../components/MuiTableBasic';
import { MuiTitlePage } from '../../components/MuiTitlePage';
import { MuiPaperPage } from '../../components/MuiPaperPage';
import { ModalEditCompany } from './ModalEditCompany';

export const CompanyPage = () => {

  const [onOpenModalCreateCompany, setOnOpenModalCreateCompany] = useState(false);
  const [onOpenModalEditCompany, setOnOpenModalEditCompany] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  /**
   * funcion que se encarga de cerrar el modal de crear empresas
   */
  const handleOnCloseModalCreateCompany = (event, reason) => {

    // se valida que no se hubierad dado click fuera del modal o presiodado la tecla esc
    if (ValidateCloseModal(reason))  setOnOpenModalCreateCompany(false)
    
  };

  /**
   * funcion que se encarga de cerrar el modal de crear empresas
   */
  const handleOnCloseModalEditCompany = (event, reason) => {

    // se valida que no se hubierad dado click fuera del modal o presiodado la tecla esc
    if (ValidateCloseModal(reason)) setOnOpenModalEditCompany(false);

  };


  /**
   * Funcion que se encarga de validar cuando un moddal esta abirto si se pica fuera de el
   * o si se oorime la tecla escape
   * @param {*} reason 
   * @returns 
   */
  const ValidateCloseModal = (reason) => (reason !== 'backdropClick' && reason !== 'escapeKeyDown');

  /** 
   * funcion que se encarga de abrir el modal de crear empresas
   */
  const handleOnOpenModalCreateCompany = () => {

    setOnOpenModalCreateCompany(true)
  }

  // Controlar el evento al hacer clic en el ícono de editar
  const handleOnOpenModalEditCompany = (rowData) => {

    // se agrga el valor de la linea a editar
    setDataEdit(rowData);
    setOnOpenModalEditCompany(true);

  };

  const inactiveCompany = (rowData) => {

    console.log(rowData)


  };




  // Definir los datos de las filas
  const rows = [
    { id: 1, com_nit: 'Nit 1', com_estado: 'ACTIVO', com_dv: '1', com_name: 'Nombre 1', com_telefono: '123',  com_direccion: 'valle', com_correo: 'correo1', com_representante: 'francisco'},
    { id: 2, com_nit: 'Nit 2', com_estado: 'ACTIVO', com_dv: '2', com_name: 'Nombre 2', com_telefono: '5678', com_direccion: 'san gil', com_correo: 'correo2', com_representante: 'antonio'},
    { id: 3, com_nit: 'Nit 3', com_estado: 'ACTIVO', com_dv: '3', com_name: 'Nombre 3', com_telefono: '9876', com_direccion: 'socorro', com_correo: 'correo3', com_representante: 'diaz'},
    // Más registros si lo deseas
  ];

  
  // Definir las columnas
  const columns = [
    { field: 'com_nit', headerName: 'Nit Empresa', flex: 1 },
    { field: 'com_name', headerName: 'Nombre Empresa', flex: 1 },
    { field: 'com_direccion', headerName: 'Direccion Empresa', flex: 1 },
    { field: 'com_correo', headerName: 'Correo Empresa', flex: 1 },
    { field: 'com_telefono', headerName: 'Telefono Empresa', flex: 1 },
    { field: 'com_estado', headerName: 'Estado Empresa', flex: 1 },  
    {
      field: 'actions',
      headerName: 'Editar',
      sortable: false,
      renderCell: (params) => (
        <Box>
          <IconButton sx={{color: 'tertiary.main'}} onClick={() => handleOnOpenModalEditCompany(params.row)} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton sx={{color: 'secondary.main'}} onClick={() => inactiveCompany(params.row)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box> 
      ),
      flex: 0.5,
    },
  ];
   
  return (
    <>
      <MuiTitlePage title={'Administraciòn empresas'} />
      <ModalCreateCompany openModal={onOpenModalCreateCompany} handleCloseModalCreate={handleOnCloseModalCreateCompany} />
      <MuiPaperPage>
        <Button sx={{ backgroundColor: 'tertiary.main' }} variant='contained' onClick={handleOnOpenModalCreateCompany}>
          <Typography>Crear empresa</Typography>
        </Button>
        <MuiTableBasic rows={rows} columns={columns} />
      </MuiPaperPage>
      <ModalEditCompany openModalEdit={onOpenModalEditCompany} handleCloseModalEdit={handleOnCloseModalEditCompany} dataEdit={dataEdit} />
    </>
  )
}
