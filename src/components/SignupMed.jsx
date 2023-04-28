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




export function SignupMed () {
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
  const loginSchema = yup.object({
    cedula: yup.string()
      .required('La cedula es requerida')
      .min(9, 'Debe de tener al menos 9 digitos'),
    name: yup.string()
      .required('El nombre es requerido')
      .min(3, 'El nombre debe tener 3 caracteres'),
    apellido1: yup.string()
      .required('El apellido es requerido')
      .min(3, 'El apellido debe tener 3 caracteres'),
    apellido2: yup.string()
      .required('El apellido es requerido')
      .min(3, 'El apellido debe tener 3 caracteres'),
    email: yup.string()
      .required('El email es requerido')
      .email('Formato email'),
    password: yup.string()
      .required('El password es requerido')
  })
  const { control, handleSubmit, setValue, formState: { errors } } =
  useForm({
    // Valores iniciales
    defaultValues: {
      cedula: '',
      name: '',
      apellido1:  '',
      apellido2: '',
      email: '',
      password: '',
      //rol_id: ''
    },
    // valores a precargar
        values,
    // Asignación de validaciones
    resolver: yupResolver(loginSchema)
  })

  // Valores de formulario
  const [formData, setData] = useState(null)
    // Accion: post, put
    const [action, setAction] = useState('POST')
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la informacion de la bicicleta a actualizar
  const { data, error, loaded } = useCallApi({ endpoint: `user/get/${id}` })
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  // eslint-disable-next-line no-unused-vars
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'user', action, formData, start, user})
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      console.log(DataForm)
      // Valor por defecto para rol
      setValue('rol_id', 2)
      setValue('sexo','N/R')
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
    if (responseData != null && responseData != "Este correo electronico ya se encuentra registrado") {
      notify1()
      return navigate('/user/')
    }
    //este informa del correo unico
    else if (responseData == "Este correo electronico ya se encuentra registrado") {
      notify2()
      return navigate('/user/createMed')
    }
    //este es el modificar
    if (!esCrear && data !=="No existe el recurso solicitado" && data !=="Solicitud sin identificador") {
      // Si es modificar establece los valores a precargar en el formulario
      setValues(data)
      console.log(data)
      notify3()
      //return navigate(`/user/update/${data.id}`)
    }
    //este informa de la actualizaciom sin exito
    else if (data =="No existe el recurso solicitado" || data =="Solicitud sin identificador") {
      console.log(data)
      notify4()
      return navigate(`/user/createMed/`)
    }
  }, [user, responseData, data, esCrear, action])

  const notify1 = () => toast.success('Usuario registrado', {
    duration: 4000,
    position: 'top-center'
  })
  const notify2 = () => toast.success('Este correo electronico ya se encuentra registrado por favor valide o ingrese otro correo electronico', {
    duration: 4000,
    position: 'top-center'
  })
  const notify3 = () => toast.success('Actualizacion', {
    duration: 4000,
    position: 'top-center'
  })
  const notify4 = () => toast.success('El usuario no se ha actualizado', {
    duration: 4000,
    position: 'top-center'
  })
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
            {esCrear ? 'Registrar' : 'Modificar'} Medico
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='cedula'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='cedula'
                    label='Cédula'
                    error={Boolean(errors.cedula)}
                    helperText={errors.cedula ? errors.cedula.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='name'
                    label='Nombre'
                    error={Boolean(errors.name)}
                    helperText={errors.name ? errors.name.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='apellido1'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='apellido1'
                    label='Primer Apellido'
                    error={Boolean(errors.apellido1)}
                    helperText={errors.apellido1 ? errors.apellido1.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='apellido2'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='apellido2'
                    label='Segundo Apellido'
                    error={Boolean(errors.apellido2)}
                    helperText={errors.apellido2 ? errors.apellido2.message : ' '}
                  />
                )}
              />
            </FormControl>
            </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='email'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='email'
                    label='Email'
                    error={Boolean(errors.email)}
                    helperText={errors.email ? errors.email.message : ' '}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='password'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    id='password'
                    label='Password'
                    type='password'
                    error={Boolean(errors.password)}
                    helperText={errors.password ? errors.password.message : ' '}
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
