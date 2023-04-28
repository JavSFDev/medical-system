import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import { useCallApi } from '../../hooks/useCallApi'
import { useParams } from 'react-router-dom'
//import Stack from '@mui/joy/Stack';


export function DetailUser () {
  const routeParams = useParams()
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint: `usuario/getForm/${routeParams.id}` })
  return (
    <>
      {!loaded && <div>Loading</div>}
      {data &&
        <div>
          <Container component='main' sx={{ mt: 8, mb: 2 }} maxWidth='sm'>
            <Typography variant='h4' component='h1' gutterBottom>
              {data.nombre} {data.apellido1} {data.apellido2}
            </Typography>
            <Typography variant='body1'>
              <span fontWeight='bold' display='inline'>Cédula:</span> {data.cedula}
            </Typography>
            <Typography variant='body1'>
              <span spacing={2} fontWeight='bold' display='inline'> Email:</span> {data.email}
            </Typography>
            <Typography variant='body1'>
              <span spacing={2} fontWeight='bold' display='inline'> Sexo:</span> {data.sexo}
            </Typography>
            <Typography variant='body1'>
              <span fontWeight='bold' display='inline'>Rol:</span> {data.rol.name}
            </Typography>
          </Container>
        </div>}
    </>
  )
}