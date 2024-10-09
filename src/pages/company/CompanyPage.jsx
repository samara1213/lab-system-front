
import { useEffect, useState } from 'react'
import { ModalCreateCompany } from './ModalCreateCompany'
import { Box, Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { MuiTableBasic } from '../../components/MuiTableBasic';
import { MuiTitlePage } from '../../components/MuiTitlePage';
import { MuiPaperPage } from '../../components/MuiPaperPage';
import { ModalEditCompany } from './ModalEditCompany';
import { getAllCompaniesDB } from '../../services';

export const CompanyPage = () => {

  const [onOpenModalCreateCompany, setOnOpenModalCreateCompany] = useState(false);
  const [onOpenModalEditCompany, setOnOpenModalEditCompany] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [arrayCompanies, setArrayCompanies] = useState([]);

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

  /**
   * funcion que se encarga de inactivar las empresas
   * @param {*} rowData 
   */
  const inactiveCompany = (rowData) => {

    console.log(rowData)


  };


  /**
   * funcion que se encarga de obtener el listado de empresas de la base de datos
   */
  const getAllCompanies = async () => {

    try {  

      // se obtiene los resultados de la base de datos
      const { data } = await getAllCompaniesDB();

      // se crea un nuevo arreglo con la informacion de la base de datos
      const  updateDate = data.map(item => {

        // se desectrura los datos del item para cambier el nombre de la propiedad com_id por id
        const { com_id, ...rest } = item;

        // se regersa el objecto con el nuevo nombre de columna
        return { id: com_id, 
                  ...rest };

      });

      // se agrega el listado a la variable de estado para pintar la tabla
      setArrayCompanies(updateDate);
      
    } catch (error) {
       
      console.log("**** ERROR CONSULTANDO EMPRESAS ****")
      console.error(error)
      console.log("**** FIN ERROR CONSULTANDO EMPRESAS ****")
      
    }
  };

  /**
   * funcion que se encarga de realizar el llamado a la base de datos apenas sse pinte el
   * componenete por primera vez
   */
  useEffect(() => {
    
    // se llama la funcionque obtiene la empresas
    getAllCompanies();

  }, []);

  // Definir las columnas
  const columns = [
    { field: 'com_nit', headerName: 'Nit Empresa', flex: 1 },
    { field: 'com_nombre', headerName: 'Nombre Empresa', flex: 1 },
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
        <MuiTableBasic rows={arrayCompanies} columns={columns} />
      </MuiPaperPage>
      <ModalEditCompany openModalEdit={onOpenModalEditCompany} handleCloseModalEdit={handleOnCloseModalEditCompany} dataEdit={dataEdit} />
    </>
  )
}
