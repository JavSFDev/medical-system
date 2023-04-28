import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import { useCallApi } from './../../hooks/useCallApi'

export function SelectAlergias (field) {
  const { data, error, loaded } = useCallApi({ endpoint: 'categoria' })
  return (
    <>
      {loaded && (
        <>
          <InputLabel id='categoriaalergia'>Categoria</InputLabel>
          <Select
            {...field}
            labelId='categoriaalergia'
            label='categoriaalergia'
            defaultValue={[]}
            value={field.field.value}
          >
            {data.map((categoriaalergia) => (
              <MenuItem key={categoriaalergia.idCategoria} value={categoriaalergia.idCategoria}>
                {categoriaalergia.nombre}
              </MenuItem>
            ))}
          </Select>
        

        </>
        
      )}
    </>
  )
}


