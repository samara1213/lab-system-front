import { Typography } from '@mui/material'
import React from 'react'

export const MuiErrorValidateForm = ({error}) => {
  return (
    <>
    {error && (<Typography color='error' variant='body2'>{error.message}</Typography>)}
    </>
  )
}
