// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useEffect, useState, useContext } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { FormHelperText } from '@mui/material'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSubmitForm } from '../hooks/useSubmitForm'
import { useCallApi } from '../hooks/useCallApi'
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from 'react-router-dom'
import { SelectSangre} from './SelectSangre'
//import { SelectTallas } from './SelectTallas'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { UserContext } from '../context/UserContext'
import toast from 'react-hot-toast'
import TimePicker from 'react-time-picker'
import DatePicker from "react-datepicker";

export function FormExpediente () {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const routeParams = useParams()
  const [startDate, setStartDate] = useState(new Date());
  const [Cdate, setDate] = useState(new Date().toLocaleDateString('fr-FR'));
  // Id de la bicicleta a actualizar
  const id = routeParams.id || null
  const esCrear = !id
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null)
  // Esquema de validación
  const expedienteSchema = yup.object({
    fechaNacimiento: yup.date()
      .required('El precio es requerido'),
    tipoSangre: yup.string()
      .typeError('Seleccione una especialidad')
      .required('La especialidad es requerida'),
    lugarResidencia: yup.string()
      .required('La ubicaciónn es requeridoa')
      .min(4, 'La ubicación debe tener 4 caracteres'),
    telefono: yup.number()
      .typeError('Solo acepta números')
      .required('El precio es requerido')
      .positive('Solo acepta números positivos'),
    contactoEmergencia: yup.number()
      .typeError('Solo acepta números')
      .required('El precio es requerido')
      .positive('Solo acepta números positivos')
  })
  const { control, handleSubmit, setValue, formState: { errors } } =
  useForm({
    // Valores iniciales
    defaultValues: {
      fechaNacimiento: '',
      tipoSangre: '',
      lugarResidencia: '',
      telefono: '',
      contactoEmergencia: ''
    },
    // valores a precargar
    values,
    // Asignación de validaciones
    resolver: yupResolver(expedienteSchema)
  })
  // Valores de formulario
  const [formData, setData] = useState(null)
  // Accion: post, put
  const [action, setAction] = useState('POST')
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la informacion de la bicicleta a actualizar
  // eslint-disable-next-line no-unused-vars
  const { data, error, loaded } = useCallApi({ endpoint: `expediente/get/${id}` })
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  // eslint-disable-next-line no-unused-vars
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'expediente', action, formData, start, user })
  // Accion submit
  const onSubmit = (DataForm) => {
    try {

      setValue('idUsuario', 2)
      
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
  // - si hay datos de la bicicleta que se debe precargar
  // - cambia el booleano que indica si es Crear o Modificar
  // - cambia el tipo de accion POST o PUT
  useEffect(() => {
    if (responseData != null) {
      toast.success(responseData, {
        duration: 4000,
        position: 'top-center'
      })
      // Si hay respuesta se creo o modifico lo redirecciona
      return navigate('/')
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
              {esCrear ? 'Crear' : 'Modificar'} Expediente
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            <label variant='h6' gutterBottom>
              Fecha Nacimiento
            </label>
              <Controller
                name='fecha'
                control={control}
                render={({ field }) =>
                <DatePicker
                  id='fechaNacimiento'
                  label='Fecha Nacimiento'
                  dateFormat="yyyy/MM/dd"
                  maxDate={new Date()}
                  placeholderText="Seleccione una fecha"
                  error={Boolean(errors.fecha)}
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                }
                sx={{ m: 1 }}
              />
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.fechaNacimiento ? errors.fechaNacimiento.message : ' '}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='tipoSangre'
                control={control}
                render={({ field }) =>
                  <SelectSangre
                    field={field}
                    onChange={(e) => setValue('tipoSangre', e.target.value, { shouldValidate: true })}
                    error={Boolean(errors.tipoSangre)}
                  />}
              />
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.tipoSangre ? errors.tipoSangre.message : ' '}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='lugarResidencia'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='lugarResidencia'
                    label='Lugar de Residencia'
                    error={Boolean(errors.lugarResidencia)}
                    helperText={errors.lugarResidencia ? errors.lugarResidencia.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='telefono'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='telefono'
                    label='Teléfono'
                    error={Boolean(errors.telefono)}
                    helperText={errors.telefono ? errors.telefono.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='contactoEmergencia'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='contactoEmergencia'
                    label='Contacto de Emergencia'
                    error={Boolean(errors.contactoEmergencia)}
                    helperText={errors.contactoEmergencia ? errors.contactoEmergencia.message : ' '}
                  />
                )}
              />
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
