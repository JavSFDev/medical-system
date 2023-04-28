// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { FormHelperText } from '@mui/material'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import Tooltip from '@mui/material/Tooltip'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSubmitForm } from '../../hooks/useSubmitForm'
import { useCallApi } from '../../hooks/useCallApi'
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from 'react-router-dom'
//import toast from 'react-hot-toast'
import { SelectEstado } from './SelectEstado'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import moment from 'moment/moment'


export function FormCita () {
  const navigate = useNavigate()
  const routeParams = useParams()
  const [startDate, setStartDate] = useState(null);
  const [Cdate, setDate] = useState(new Date().toLocaleDateString('fr-FR'));
  const [time, setTime] = useState(new Date());
  // Id de la pelicula a actualizar
  const id = routeParams.id
  const esCrear = !id
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null)
  // Esquema de validación
  const citaSchema = yup.objecct({
    // estado: yup.string()
    //   .required('El estado es requerido'),
    // fecha: yup.date()
    //   .required('La fecha es requerida'),
    // //Validar que la fecha sea mayor que la actual
    // hora: yup.string()
    //   .required('La hora es requerida'),
  })
  const { control, handleSubmit, setValue, formState: { errors } } =
  useForm({
    // Valores iniciales
    defaultValues: {
      idMedico: '2',
      estado: '',
      fecha: '',
      hora: ''
    },
    // valores a precargar
    values,
    // Asignación de validaciones
    resolver: yupResolver(citaSchema)
  })
  // useFieldArray:
  // relaciones de muchos a muchos, con más campos además
  // de las llaves primaras
  // eslint-disable-next-line no-unused-vars

  // Valores de formulario
  const [formData, setData] = useState(null)
  // Accion: post, put
  const [action, setAction] = useState('POST')
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la informacion de la pelicula a actualizar
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint: `cita/get/${id}` })
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  // eslint-disable-next-line no-unused-vars
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'cita', action, formData, start  })
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      // Establecer valores del formulario
      console.log(DataForm)
      setData(DataForm)
      // Indicar que se puede realizar la solicitud al API
      setStart(true)
      // Establecer el tipo de métod HTTP
      if (esCrear) {
        setAction('POST')
      } else {
        setAction('PUT')
      }
    } catch (e) {
      // handle your error
    }
  }
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e)
  // Ejecutar si hay algun cambio en:
  // - la respuesta del API al crea o actualizar
  // - si hay datos de la pelicula que se debe precargar
  // - cambia el booleano que indica si es Crear o Modificar
  // - cambia el tipo de accion POST o PUT
  useEffect(() => {
    if (responseData != null) {
      // Si hay respuesta se creo o modifico lo redirecciona
      return navigate('/medicamento-table')
    }
    if (!esCrear && data) {
      // Si es modificar establece los valores a precargar en el formulario
      setValues(data)
      console.log(data)
    }
  }, [responseData, data, esCrear, action])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              {esCrear ? 'Crear' : 'Modificar'} Cita
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='estado'
                control={control}
                render={({ field }) =>
                  <SelectEstado
                    field={field}
                    onChange={(e) => setValue('estado', e.target.value, { shouldValidate: true })}
                    error={Boolean(errors.estado)}
                  />}
              />
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.estado ? errors.estado.message : ' '}</FormHelperText>
            </FormControl>
          </Grid>
  
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='fecha'
                control={control}
                render={({ field }) =>
                <DatePicker
                  id='fecha'
                  label='Fecha'
                  dateFormat="yyyy/MM/dd"
                  minDate={new Date()}
                  maxDate={new Date().setDate(31)}
                  placeholderText="Seleccione una fecha"
                  error={Boolean(errors.fecha)}
                  value={Cdate}
                  onChange={(date) => {
                    const d = new Date(date).toLocaleDateString('fr-FR');
                    console.log(d);
                    setDate(d);
                  }}
                />
                }
                sx={{ m: 1 }}
              />
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.fecha ? errors.fecha.message : ' '}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='hora'
                control={control}
                render={({ field }) =>
                <DatePicker
                  id='hora'
                  label='Hora'
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={60}
                  timeCaption="Hora"
                  dateFormat="HH:mm"
                  timeFormat="HH:mm"
                />
                }
                sx={{ m: 1 }}
              />
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.hora ? errors.hora.message : ' '}</FormHelperText>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={12}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>Guardar</Button>

          </Grid>
        </Grid>
      </form>
    </>
  )

}

