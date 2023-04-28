import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from '../hooks/useCallApi'

export function SelectEspecialidad (field) {
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint: 'especialidad' })
  return (
    <>
      {loaded && (
        <>
          <InputLabel id='especialidad'>Especialidad</InputLabel>
          <Select
            {...field}
            labelId='especialidad'
            label='especialidad'
            defaultValue=''
            value={field.field.value}
          >
            {data.map((especialidad) => (
              <MenuItem key={especialidad.idEspecialidad} value={especialidad.idEspecialidad}>
                {especialidad.nombre}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </>
  )
}
