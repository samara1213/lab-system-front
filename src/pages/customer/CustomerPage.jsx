import { Box, Button, IconButton, Typography } from "@mui/material"
import { MuiPaperPage } from "../../components/MuiPaperPage"
import { MuiTitlePage } from "../../components/MuiTitlePage"
import { MuiTableBasic } from "../../components/MuiTableBasic"
import { useUserStore } from "../../hooks/useUserStore"
import { getCustomersByCompanyDB } from "../../services"
import { useEffect, useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import { ModalCreateCustomer } from "./ModalCreateCustomer"
import { ModalEditCustomer } from "./ModalEditCustomer"


export const CustomerPage = () => {

    // consultamos los datos del usuario que estan guardados en redux
    const { userInfo } = useUserStore();

    const [arrayCustomers, setArrayCustomers] = useState([]);
    const [onOpenModalCreate, setOnOpenModalCreate] = useState(false);
    const [onOpenModalEdit, setOnOpenModalEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    
    /**
     * funcion que se encarga de abrir el modal de crear un nuevo cliente
     */
    const handleOnOpenModalCreateCustomer = () => {

        setOnOpenModalCreate(true);

    }

  /**
   * funcion que se encarga de cerrar el modal de crear empresas
   */
  const handleOnCloseModalCreate = (event, reason) => {

    // se valida que no se hubierad dado click fuera del modal o presiodado la tecla esc
    if (ValidateCloseModal(reason))  setOnOpenModalCreate(false)
    
  };


  /**
   * funcion que se encarga de cerrar el modal de crear empresas
   */
  const handleOnCloseModalEdit = (event, reason) => {

    // se valida que no se hubierad dado click fuera del modal o presiodado la tecla esc
    if (ValidateCloseModal(reason))  setOnOpenModalEdit(false)
    
  };

    /**
     * Funcion que se encarga de abrir el modal de editra  clientes
     * @param {*} rowData   datos del cliente a editar
     */
    const handleOnOpenModalEditCustomer = (rowData) => {
        
        setDataEdit(rowData);
        setOnOpenModalEdit(true);
    }


    /**
     * Funcion que se encarga de realizar la consulta a la base de datos de los clientes
     * de la empresa logueada 
     */
    const getCustomersByCompany = async () => {

        try {

            const { data } = await getCustomersByCompanyDB(userInfo.company.com_id);
            
            // sacasmos el listrado de clientes de la data
            const customers = data.data;
            
            // se crea un nuevo arreglo con la informacion de la base de datos
            const  updateDate = customers.map(item => {

                // se desectrura los datos del item para cambier el nombre de la propiedad com_id por id
                const { cus_id, ...rest } = item;

                // se regersa el objecto con el nuevo nombre de columna
                return { id: cus_id, 
                         ...rest };

            });

            // se agrega el listado a la variable de estado para pintar la tabla
            setArrayCustomers(updateDate);
    
        } catch (error) {
            
            console.log("**** ERROR CONSULTANDO CLIENTES ****")
            console.error(error)
            console.log("**** FIN ERROR CONSULTANDO CLIENTES ****")
            
        }

    }

    /**
     * Funcion que se encarga de validar cuando un moddal esta abirto si se pica fuera de el
     * o si se oorime la tecla escape
     * @param {*} reason 
     * @returns 
     */
  const ValidateCloseModal = (reason) => (reason !== 'backdropClick' && reason !== 'escapeKeyDown');

    
    /**
     * Funcion que se encarga de realizar la peticion a la base de datos apenas se carge la pagina
     */
    useEffect(() => {
      
        // se ejecuta la funcion que tiene la logica para llamar a la base de datos
        getCustomersByCompany();
       
    }, [])

    // Definir las columnas
    const columns = [
        { field: 'cus_numero_doc', headerName: 'No Documento', flex: 1 },
        { field: 'cus_primer_apellido', headerName: 'Primer apellido', flex: 1 },
        { field: 'cus_primer_nombre', headerName: 'Primer nombre', flex: 1 },
        { field: 'cus_telefono', headerName: 'No telefono', flex: 1 },
        { field: 'cus_correo', headerName: 'Correo', flex: 1 },
        {
        field: 'actions',
        headerName: 'Editar',
        sortable: false,
        renderCell: (params) => (
            <Box>
            <IconButton sx={{color: 'tertiary.main'}} onClick={() => handleOnOpenModalEditCustomer(params.row)} aria-label="edit">
                <EditIcon />
            </IconButton> 
            </Box> 
        ),
        flex: 0.5,
        },
    ];

    
    return (
        <>
            <MuiTitlePage title={'Administraciòn Clientes'} />
            <MuiPaperPage>
                <Button sx={{ backgroundColor: 'tertiary.main' }} variant='contained' onClick={handleOnOpenModalCreateCustomer}>
                <Typography>Crear Cliente</Typography>
                </Button>
                <MuiTableBasic rows={arrayCustomers} columns={columns} />
                <ModalCreateCustomer openModal={onOpenModalCreate} 
                                     handleCloseModalCreate={handleOnCloseModalCreate}
                                     reloadTable={getCustomersByCompany}/>
                <ModalEditCustomer openModalEdit={onOpenModalEdit}
                                   handleCloseModalEdit={handleOnCloseModalEdit}
                                   dataEdit={dataEdit}/>
            </MuiPaperPage>
        </>
    )
}
