
import { useState } from 'react'
import { ModalCreateCompany } from './ModalCreateCompany'
import { Button } from '@mui/material';

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

  return (
    <>
    <Button onClick={handleOnOpenModalCreateCompany}>
      abrir
    </Button>
    <ModalCreateCompany openModal={onOpenModalCreateCompany} handleCloseModalCreate={handleOnCloseModalCreateCompany}/>
    </>
  )
}
