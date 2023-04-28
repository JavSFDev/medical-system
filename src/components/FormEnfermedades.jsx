import * as React from 'react'
import { useEffect, useState } from 'react'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useSubmitForm } from '../../hooks/useSubmitForm'
import { useCallApi } from '../../hooks/useCallApi'
import { useNavigate, useParams } from 'react-router-dom'
import { FormHelperText } from '@mui/material'

export function FormEnfermedades () {
  const navigate = useNavigate()
  const routeParams = useParams()
  // Id de la enfermedad a actualizar
  const idEnfermedad = routeParams.id
  const esCrear = !idEnfermedad
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null)
  // Esquema de validación
  const enfermedadSchema=yup.object({
    nombre: yup.string()
      .required('El nombre es requerido')
      .min(3, 'El nombre debe tener minimo, 3 caracteres')

    /*idEnfermedad: yup.string()
      .typeError('Seleccione una enfermedad')
      .required('Es requerido indicar una enfermedad')
       */
  })
 
  //Establecer formulario
  //valores defecto, valores de carga y validación 
  const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
      // Valores iniciales
      defaultValues:{
        nombre:'',
        idEnfermedad:'',
        //categoria: '' uno de muchos con un select
        //generos: [] muchos a muchos con un select multiple

      },
      // valores a precargar
      values,
      // Asignación de validaciones
      resolver: yupResolver(enfermedadSchema)
    })
  // useFieldArray:
  // relaciones de muchos a muchos, con más campos además
  // de las llaves primaras
  // multiple useFielArray
 // const {fields, append, prepend, remove, swap, move, insert } =useFieldArray({
 //   control, //control props proviene de useForm
 //   name: 'actors' //nombre único para el campo Array
 // })

  // Valores de formulario
  const [formData, setData] = useState(null)
  // Accion: post, put
  const [action, setAction] = useState('POST')
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false)
  // Obtener la informacion de la enfermedad a actualizar
  const { data, error, loaded } = useCallApi({ endpoint: `enfermedad/get/${idEnfermedad}` })
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'enfermedad', action, formData, start })
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      console.log(DataForm)
      // Establecer valores del formulario
      setData(DataForm)
      // Indicar que se puede realizar la solicitud al API
      setStart(true)
      // Establecer el tipo de métod HTTP
      if(esCrear){
        setAction('POST')
      }else{
        setAction('PUT')
      }

    } catch (e) {
      // handle your error
    }
  }
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e)

  //useEffect responseData, data, esCrear, action
  // Ejecutar si hay algun cambio en:
  // - la respuesta del API al crear o actualizar
  // - si hay datos de la pelicula que se debe precargar
  // - cambia el booleano que indica si es Crear o Modificar
  // - cambia el tipo de accion POST o PUT
  useEffect(()=>{ 
  
    //Verificar si se recibe respuesta del API
    //al crear o modificar
    if(responseData!= null){
      return navigate('/enfermedad-table/')
    }
    
    //Establecer valores iniciales
    // Si es modificar establece los valores a precargar en el formulario
    if(!esCrear && data){
      setValues(data)
    }
    
  },[responseData,data,esCrear])
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit,onError)} noValidate>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant='h5' gutterBottom>
              {esCrear ? 'Crear' : 'Modificar'} Enfermedad
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            {/* ['filled','outlined','standard']. */}
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
              <Controller
                name='nombre'
                control={control}
                render={({ field })=>(
                  <TextField
                    { ... field}
                    id='nombre'
                    label='Enfermedad'
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : ''}
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
