import { useParams } from "react-router-dom"
import { MuiTitlePage } from "../../components/MuiTitlePage"
import { MuiPaperPage } from "../../components/MuiPaperPage";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getExanenByIdDB } from "../../services";

export const Exam_parameter = () => {

  // obtnemos el id del examen y el nombre del examen
  const { examId, examName } = useParams();
  const [currentExam, setCurrentExam] = useState(null);
  const [arrayParameters, setArrayParameters] = useState([]);

  /**
   * funcion que se encarga de abrir el modal de agragar nuevos parametros
   */
  const handleOnOpenModalCreate = () => {

    console.log('hola mundo');
  }

  const getExamnById = async (id) => {

    console.log(id)

    try {

      // realizamos la consulta a la base de datos
      const { data } = await getExanenByIdDB(id);

      // sacasmos el listrado de examenes de la data
      const exams = data.data;

      // validamos que exista el examen 
      if (exams) {

        // agregamos el valor del examen
        setCurrentExam(exams);
        setArrayParameters(exams.parm_exam);
      }

      console.log(exams);



    } catch (error) {

      console.log("**** ERROR CONSULTANDO TYPO DE EXAMEN ****")
      console.error(error)
      console.log("**** FIN ERROR CONSULTANDO TYPO DE EXAMEN ****")

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
      headerName: 'Acciones',
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title='Editar'>
            <IconButton sx={{ color: 'tertiary.main' }} onClick={() => handleOnOpenModalEditExam(params.row)} aria-label="edit">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='Parametros'>
            <IconButton sx={{ color: 'primary.main' }} onClick={() => handleOnOpenAddParameters(params.row)} aria-label="Agregar">
              <PostAddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      flex: 0.5,
    },
  ];


  /**
   * funcion que se encarga de realizar la consulta del tipo de examen 
   * a agregar los parametros
   */
  useEffect(() => {

    getExamnById(examId);

  }, [])


  return (
    <>
      <MuiTitlePage title={`Administrar parametros ${examName}`} />
      <MuiPaperPage>
        <Button sx={{ backgroundColor: 'tertiary.main' }} variant='contained' onClick={handleOnOpenModalCreate}>
          <Typography>Agregar parametro</Typography>
        </Button>
      </MuiPaperPage>
    </>
  )
}
