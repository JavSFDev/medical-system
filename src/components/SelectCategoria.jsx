import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from '../hooks/useCallApi'

export function SelectCategoria (field) {
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint: 'categoria' })
  return (
    <>
      {loaded && (
        <>
          <InputLabel id='categoria'>Categoría</InputLabel>
          <Select
            {...field}
            labelId='categoria'
            label='categoria'
            defaultValue=''
            value={field.field.value}
          >
            {data.map((categoria) => (
              <MenuItem key={categoria.idCategoria} value={categoria.idCategoria}>
                {categoria.nombre}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </>
  )
}
