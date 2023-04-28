// eslint-disable-next-line no-unused-vars
import * as React from 'react'
import { useEffect, useState, useContext } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSubmitForm } from '../hooks/useSubmitForm'
import { useCallApi } from '../hooks/useCallApi'
// eslint-disable-next-line no-unused-vars
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import toast from 'react-hot-toast'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import { SelectEspecialidad} from './SelectEspecialidad'
import { FormHelperText } from '@mui/material'



export function FormConsulta () {
  //const { user } = useContext(UserContext)
  const { user, decodeToken, autorize } = useContext(UserContext)
  const [userData, setUserData] = useState(decodeToken())
  const navigate = useNavigate()
  const routeParams = useParams()
  
  const id = routeParams.id || null
  //const id = routeParams.id 
  const esCrear = !id
    // Valores a precarga al actualizar
    const [values, setValues] = useState(null)
  // Esquema de validación
  const consultaSchema = yup.object({
    idEspecialidad: yup.number()
      .typeError('Seleccione una especialidad')
      .required('La especialidad es requerida'),

    precio: yup.number()
      .typeError('Solo acepta números')
      .required('El precio es requerido')
      .positive('Solo acepta números positivos'),

    ubicacion: yup.string()
      .required('La ubicaciónn es requeridoa')
      .min(4, 'La ubicación debe tener 4 caracteres')
  })
  const { control, handleSubmit, setValue, formState: { errors } } =
  useForm({
    // Valores iniciales
    defaultValues: {
      precio: '',
      idEspecialidad: '',
      ubicacion:  ''
    },
    // valores a precargar
        values,
    // Asignación de validaciones
    resolver: yupResolver(consultaSchema)
  })

  // Valores de formulario
  const [formData, setData] = useState(null)
    // Accion: post, put
    const [action, setAction] = useState('POST')
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la informacion de la bicicleta a actualizar
  const { data, error, loaded } = useCallApi({ endpoint: `consulta/${id}` })
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  // eslint-disable-next-line no-unused-vars
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'consulta', action, formData, start, user})
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      console.log(DataForm)
      // Valor por defecto para rol
      setValue('idMedico', 2)
      // Establecer valores del formulario
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
      console.log(e&"Entre")
    }
  }
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e)

  useEffect(() => {
    if (user || !esCrear){
      setUserData(decodeToken())
    }
    //Este crea
    if (responseData != null && responseData != "No se creo el recurso") {
      notify1()
      return navigate('/home/')
    }
    //este informa del correo unico
    else if (responseData == "No se creo el recurso") {
      notify2()
      return navigate('/home/')
    }
    //este es el modificar
    if (!esCrear && data !==null && data !=="Solicitud sin identificador") {
      // Si es modificar establece los valores a precargar en el formulario
      setValues(data)
      console.log(data)
      notify3()
      //return navigate(`/user/update/${data.id}`)
    }
    //este informa de la actualizaciom sin exito
    else if (data ==null || data =="Solicitud sin identificador") {
      console.log(data)
      notify4()
      return navigate(`/consulta/`)
    }
  }, [user, responseData, data, esCrear, action])

  const notify1 = () => toast.success('Usuario registrado', {
    duration: 4000,
    position: 'top-center'
  })
  const notify2 = () => toast.success('No se creo el la consulta, por favor valide o intente nuevamente', {
    duration: 4000,
    position: 'top-center'
  })
  const notify3 = () => toast.success('Actualizacion', {
    duration: 4000,
    position: 'top-center'
  })
  const notify4 = () => toast.success('La consulta no se ha actualizado', {
    duration: 4000,
    position: 'top-center'
  })
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' >
              {esCrear ? 'Crear' : 'Modificar'} Servicio Consulta
            </Typography>
          </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='idEspecialidad'
                control={control}
                render={({ field }) =>
                  <SelectEspecialidad
                    field={field}
                    onChange={(e) => setValue('idEspecialidad', e.target.value, { shouldValidate: true })}
                    error={Boolean(errors.idEspecialidad)}
                  />}
              />
              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.idEspecialidad ? errors.idEspecialidad.message : ' '}</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='precio'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='precio'
                    label='Precio por Consulta'
                    error={Boolean(errors.precio)}
                    helperText={errors.precio ? errors.precio.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
          <label variant='h5' >
                Ubicación
              </label>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='ubicacion'
                control={control}
                render={({ field }) => (
                  <TextareaAutosize
                    {...field}
                    minRows='5'
                    id='ubicacion'
                    label='Ubicacion'
                  />
                )}
              />
               <FormHelperText sx={{ color: '#d32f2f' }}>{errors.ubicacion ? errors.ubicacion.message : ' '}</FormHelperText>
            </FormControl>
          <Grid item xs={12} sm={12}>
            <Button type='submit' variant='contained' color='secondary' sx={{ m: 1 }}>Guardar</Button>

          </Grid>
        </Grid>
      </form>
    </>
  )
}
