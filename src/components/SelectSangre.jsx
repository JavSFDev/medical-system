import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'

export function SelectSangre (field) {

  const data = [
    { id: 1, title: 'O+', value: 'O+' },
    { id: 2, title: 'O-', value: 'O-' },
    { id: 3, title: 'A+', value: 'A+' },
    { id: 1, title: 'A-', value: 'A-' },
    { id: 2, title: 'B+', value: 'B+' },
    { id: 3, title: 'B-', value: 'B-' },
    { id: 2, title: 'AB-', value: 'AB-' },
    { id: 3, title: 'AB+', value: 'AB+' }
  ];

  return (
    <>
      { (
        <>
          <InputLabel id='tipoSangre'>Tipo Sangre</InputLabel>
          <Select
            {...field}
            labelId='tipoSangre'
            label='tipoSangre'
            defaultValue={[]}
            value={field.field.value}
          >
            {data.map((tipoSangre) => (
              <MenuItem key={tipoSangre.id} value={tipoSangre.title}>
                {tipoSangre.title}
              </MenuItem>
            ))}
          </Select>
        </>
      )}
    </>
  )}
