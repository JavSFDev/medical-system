import React from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from '../hooks/useCallApi'

export function SelectTallas (field) {
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint: 'talla' })
  return (
    <>
      {loaded && (
        <>
          <InputLabel id='talla'>Tallas</InputLabel>
          <Select
            {...field}
            labelId='talla'
            label='talla'
            multiple
            defaultValue={[]}
            value={field.field.value}
          >
            {data.map((talla) => (
              <MenuItem key={talla.idTalla} value={talla.idTalla}>
                {talla.nombre}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </>
  )
}
