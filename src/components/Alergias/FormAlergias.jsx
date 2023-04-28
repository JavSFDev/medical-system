import * as React from 'react'
import { useEffect, useState } from 'react'
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
import { useNavigate, useParams } from 'react-router-dom'
import { SelectAlergias } from './SelectAlergias'
export function FormAlergias () {
  const navigate = useNavigate()
  const routeParams = useParams()
  // Id de la alergia a actualizar
  const idAlergia = routeParams.id
  const esCrear = !idAlergia
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null)
  // Esquema de validación
  const alergiaSchema=yup.object({
    nombre: yup.string()
      .required('El nombre es requerido')
      .min(3, 'El nombre debe tener minimo, 3 caracteres'),

    idCategoria: yup.string()
      .typeError('Seleccione una categoria')
      .required('La categoria es requerida')
  })
  //Establecer formulario
  //valores defecto, valores de carga y validación 
  const {control, handleSubmit, setValue, formState:{errors}}=
    useForm({
      // Valores iniciales
      defaultValues:{
        nombre:'',
        idCategoria:'',
        //categoria: '' uno de muchos con un select
        //generos: [] muchos a muchos con un select multiple

      },
      // valores a precargar
      values,
      // Asignación de validaciones
      resolver: yupResolver(alergiaSchema)
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
  // Obtener la informacion de la alergia a actualizar
  const { data, error, loaded } = useCallApi({ endpoint: `alergia/getForm/${idAlergia}` })
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  const { responseData, errorData, loadedData } = useSubmitForm({ endpoint: 'alergia', action, formData, start })
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
      return navigate('/alergia-table/')
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
              {esCrear ? 'Crear' : 'Modificar'} Alergia
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
                    label='Alergia'
                    error={Boolean(errors.nombre)}
                    helperText={errors.nombre ? errors.nombre.message : ''}
                  />
                )}
               />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl variant='standard' fullWidth sx={{ m: 1 }}>
            
            <Controller
                name='idCategoria'
                control={control}
                render={({ field })=>(
                  <SelectAlergias 
                     field={field}
                     error={Boolean(errors.idCategoria)}
                     onChange={(e)=>setValue('idCategoria',e.target.value,{shouldValidate:true})}
                  />
                )}
               />  

              <FormHelperText sx={{ color: '#d32f2f' }}>{errors.idCategoria ? errors.idCategoria.message : ''}</FormHelperText>
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
