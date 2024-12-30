import { useEffect, useState } from "react";
import { MuiPaperPage } from "../../components/MuiPaperPage"
import { MuiTitlePage } from "../../components/MuiTitlePage"
import { useUserStore } from "../../hooks/useUserStore"
import { getExamsByCompanyDB } from "../../services";
import { MuiTableBasic } from "../../components/MuiTableBasic";
import { Box, Button, IconButton, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { ModalCreateExam } from "./ModalCreateExam";
import { ValidateCloseModal } from "../../helpers/utilities.";
import { ModalEditExamen } from "./ModalEditExamen";

export const Exam = () => {

    const { userInfo } = useUserStore();
    const [arrayExams, setArrayExams] = useState([]);
    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [onOpenModalEdit, setOnOpenModalEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);

    /**
   * Funcion que se encarga de abrir el modal de editra  clientes
   * @param {*} rowData   datos del cliente a editar
   */
    const handleOnOpenModalEditExam = (rowData) => {
        
        setDataEdit(rowData);
        setOnOpenModalEdit(true);
    }

    /**
     * funcion que se encarga de abrir el modal para registrar un nuevo 
     * examen para la empresa
     */
    const handleOnOpenModalCreate = () => {

        setOpenModalCreate(true);
    }

    /**
    *funcion que se encarga de cerrar el modal de crear empresas
    */
    const handleOnCloseModalCreate = (event, reason) => {

        // se valida que no se hubierad dado click fuera del modal o presiodado la tecla esc
        if (ValidateCloseModal(reason))  setOpenModalCreate(false)
        
    };

    /**
    *funcion que se encarga de cerrar el modal de crear empresas
    */
    const handleOnCloseModalEdit = (event, reason) => {

        // se valida que no se hubierad dado click fuera del modal o presiodado la tecla esc
        if (ValidateCloseModal(reason))  setOnOpenModalEdit(false)
        
    };

    /**
     * funcion que se encarga de obtner el listado de exames de una empresa
     */
    const getExamsByCompany = async () => {

        try {

            // se consulta en la base de datos los examenes configurados para la empresa
            const { data } = await getExamsByCompanyDB(userInfo.company.com_id);

            // sacasmos el listrado de examenes de la data
            const exams = data.data;

            // se crea un nuevo arreglo con la informacion de la base de datos
            const updateDate = exams.map(item => {

                // se desectrura los datos del item para cambier el nombre de la propiedad com_id por id
                const { exa_id, exa_convenius, ...rest } = item;

                // se regersa el objecto con el nuevo nombre de columna
                return {
                    id: exa_id,
                    convenius: exa_convenius ? 'SI' : 'NO',
                    ...rest
                };

            });

            setArrayExams(updateDate);

        } catch (error) {

            console.log("**** ERROR CONSULTANDO EXAMENES ****")
            console.error(error)
            console.log("**** FIN ERROR CONSULTANDO EXAMENES ****")
        }
    }

    // Definir las columnas
    const columns = [
        { field: 'exa_name', headerName: 'Nombre examen', flex: 1 },
        { field: 'convenius', headerName: 'Convenio', flex: 1 },
        { field: 'exa_convenius_name', headerName: 'Nombre convenio', flex: 1 },
        { field: 'exa_price', headerName: 'Precio', flex: 1 },
        {
            field: 'actions',
            headerName: 'Editar',
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton sx={{ color: 'tertiary.main' }} onClick={() => handleOnOpenModalEditExam(params.row)} aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </Box>
            ),
            flex: 0.5,
        },
    ];

    

    /**
     * funcion para cargar los datos de la empresa apenas se abra la pantalla
     */
    useEffect(() => {

        getExamsByCompany();

    }, []);


    return (
        <>
            <MuiTitlePage title={'Administraciòn tipos de examenes'} />
            <MuiPaperPage>
                <Button sx={{ backgroundColor: 'tertiary.main' }} variant='contained' onClick={handleOnOpenModalCreate}>
                    <Typography>Crear tipo examen</Typography>
                </Button>
                <MuiTableBasic rows={arrayExams} columns={columns}/>
                <ModalCreateExam openModal={openModalCreate}
                                 handleCloseModalCreate={handleOnCloseModalCreate}
                                 reloadTable={getExamsByCompany}
                                 />
                <ModalEditExamen openModalEdit={onOpenModalEdit}
                                 handleCloseModalEdit={handleOnCloseModalEdit}
                                 dataEdit={dataEdit}/>
            </MuiPaperPage>
        </>
    )
}
