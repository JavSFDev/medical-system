import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'

export function SelectEstado (field) {

  const data = [
    { id: 1, title: 'Disponible', value: 'disponible' },
    { id: 2, title: 'Agendada', value: 'agendada' },
    { id: 3, title: 'Cancelada', value: 'cancelada' }
  ];

  return (
    <>
      { (
        <>
          <InputLabel id='estado'>Estado</InputLabel>
          <Select
            {...field}
            labelId='estado'
            label='estado'
            defaultValue={[]}
            value={field.field.value}
          >
            {data.map((estado) => (
              <MenuItem key={estado.id} value={estado.title}>
                {estado.title}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </>
  )}
