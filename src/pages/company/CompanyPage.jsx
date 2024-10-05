
import { useState } from 'react'
import { ModalCreateCompany } from './ModalCreateCompany'
import { Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { MuiTableBasic } from '../../components/MuiTableBasic';
import { MuiTitlePage } from '../../components/MuiTitlePage';
import { MuiPaperPage } from '../../components/MuiPaperPage';

export const CompanyPage = () => {

  const [onOpenModalCreateCompany, setOnOpenModalCreateCompany] = useState(false);

  /**
   * funcion que se encarga de cerrar el modal de crear empresas
   */
  const handleOnCloseModalCreateCompany = (event, reason) => {

    // se valida que no se hubierad dado click fuera del modal o presiodado la tecla esc
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {

      setOnOpenModalCreateCompany(false)
    }
  };

  /** 
   * funcion que se encarga de abrir el modal de crear empresas
   */
  const handleOnOpenModalCreateCompany = () => {

    setOnOpenModalCreateCompany(true)
  }



  // Definir los datos de las filas
  const rows = [
    { id: 1, name: 'John Doe', age: 30, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 25, email: 'jane@example.com' },
    { id: 3, name: 'Michael Brown', age: 40, email: 'michael@example.com' },
    // Más registros si lo deseas
  ];

  // Definir las columnas
  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'age', headerName: 'Age', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleEditClick(params.row)} aria-label="edit">
          <EditIcon />
        </IconButton>
      ),
      flex: 0.5,
    },
  ];

  // Controlar el evento al hacer clic en el ícono de editar
  const handleEditClick = (rowData) => {
    console.log('Registro seleccionado:', rowData);
  };


  return (
    <>
      <MuiTitlePage title={'Administraciòn empresas'} />
      <ModalCreateCompany openModal={onOpenModalCreateCompany} handleCloseModalCreate={handleOnCloseModalCreateCompany} />
      <MuiPaperPage>
        <Button sx={{backgroundColor: 'tertiary.main'}} variant='contained' onClick={handleOnOpenModalCreateCompany}>
          <Typography>Crear empresa</Typography>
        </Button>
        <MuiTableBasic rows={rows} columns={columns} />
      </MuiPaperPage>
    </>
  )
}
