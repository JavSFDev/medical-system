import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import {
  Typography,
  TextField,
  Button,
  Avatar,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  createTheme,
  ThemeProvider,
  Grid,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from 'react-hot-toast'

import { useSubmitForm } from "../hooks/useSubmitForm";
import { UserContext } from "../context/UserContext";
import { useCallApi } from "../hooks/useCallApi";
import vite from "../assets/vite.svg";

const theme = createTheme();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="https://mui.com/">
        Clinica Esfuerzo y Perseverancia
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export function Signup() {
  //const { user } = useContext(UserContext)
  const { user, decodeToken, autorize } = useContext(UserContext);
  const [userData, setUserData] = useState(decodeToken());
  const navigate = useNavigate();
  const routeParams = useParams();

  const id = routeParams.id || null;
  //const id = routeParams.id
  const esCrear = !id;
  // Valores a precarga al actualizar
  const [values, setValues] = useState(null);
  // Esquema de validación
  const loginSchema = yup.object({
    cedula: yup
      .string()
      .required("La cedula es requerida")
      .min(9, "Debe de tener al menos 9 digitos"),
    name: yup
      .string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener 3 caracteres"),
    apellido1: yup
      .string()
      .required("El apellido es requerido")
      .min(3, "El apellido debe tener 3 caracteres"),
    apellido2: yup
      .string()
      .required("El apellido es requerido")
      .min(3, "El apellido debe tener 3 caracteres"),
    email: yup
      .string()
      .required("El email es requerido")
      .email("Formato email"),
    password: yup.string().required("El password es requerido"),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    // Valores iniciales
    defaultValues: {
      cedula: "",
      name: "",
      apellido1: "",
      apellido2: "",
      email: "",
      password: "",
      //rol_id: ''
    },
    // valores a precargar
    values,
    // Asignación de validaciones
    resolver: yupResolver(loginSchema),
  });

  // Valores de formulario
  const [formData, setData] = useState(null);
  // Accion: post, put
  const [action, setAction] = useState("POST");
  // Booleano para establecer si se envia la informacion al API
  const [start, setStart] = useState(false);
  // Obtener la informacion de la bicicleta a actualizar
  const { data, error, loaded } = useCallApi({ endpoint: `user/get/${id}` });
  // Obtener la respuesta de la solicitud de crear o actualizar en el API
  // eslint-disable-next-line no-unused-vars
  const { responseData, errorData, loadedData } = useSubmitForm({
    endpoint: "user",
    action,
    formData,
    start,
    user,
  });
  // Accion submit
  const onSubmit = (DataForm) => {
    try {
      console.log(DataForm);
      // Valor por defecto para rol
      setValue("rol_id", 3);
      setValue("sexo", "Femenino");
      // Establecer valores del formulario
      setData(DataForm);
      // Indicar que se puede realizar la solicitud al API
      setStart(true);
      // Establecer el tipo de métod HTTP
      if (esCrear) {
        setAction("POST");
      } else {
        setAction("PUT");
      }
    } catch (e) {
      // handle your error
      console.log(e & "Entre");
    }
  };
  // Si ocurre error al realizar el submit
  const onError = (errors, e) => console.log(errors, e);

  useEffect(() => {
    if (user || !esCrear) {
      setUserData(decodeToken());
    }
    //Este crea
    if (
      responseData != null &&
      responseData != "Este correo electronico ya se encuentra registrado"
    ) {
      notify1();
      return navigate("/user/login");
    }
    //este informa del correo unico
    else if (
      responseData == "Este correo electronico ya se encuentra registrado"
    ) {
      notify2();
      return navigate("/user/create");
    }
    //este es el modificar
    if (
      !esCrear &&
      data !== "No existe el recurso solicitado" &&
      data !== "Solicitud sin identificador"
    ) {
      // Si es modificar establece los valores a precargar en el formulario
      setValues(data);
      console.log(data);
      notify3();
      //return navigate(`/user/update/${data.id}`)
    }
    //este informa de la actualizaciom sin exito
    else if (
      data == "No existe el recurso solicitado" ||
      data == "Solicitud sin identificador"
    ) {
      console.log(data);
      notify4();
      return navigate(`/user/create/`);
    }
  }, [user, responseData, data, esCrear, action]);

  const notify1 = () =>
    toast.success("Usuario registrado", {
      duration: 4000,
      position: "top-center",
    });
  const notify2 = () =>
    toast.success(
      "Este correo electronico ya se encuentra registrado por favor valide o ingrese otro correo electronico",
      {
        duration: 4000,
        position: "top-center",
      }
    );
  const notify3 = () =>
    toast.success("Actualizacion", {
      duration: 4000,
      position: "top-center",
    });
  const notify4 = () =>
    toast.success("El usuario no se ha actualizado", {
      duration: 4000,
      position: "top-center",
    });

  return (
    <>
      <ThemeProvider>
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage:
                "url(https://www.slidebackground.com/uploads/hospital-background/hospital-backgrounds-full-pictures-16.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "#ffffff" }}>
                <img src={vite} alt="logo" />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit, onError)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Controller
                      name="cedula"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          id="cedula"
                          label="Cédula"
                          error={Boolean(errors.cedula)}
                          helperText={
                            errors.cedula ? errors.cedula.message : " "
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          id="name"
                          label="Nombre"
                          error={Boolean(errors.name)}
                          helperText={errors.name ? errors.name.message : " "}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="apellido1"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          id="apellido1"
                          label="Primer Apellido"
                          error={Boolean(errors.apellido1)}
                          helperText={
                            errors.apellido1 ? errors.apellido1.message : " "
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Controller
                      name="apellido2"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          id="apellido2"
                          label="Segundo Apellido"
                          error={Boolean(errors.apellido2)}
                          helperText={
                            errors.apellido2 ? errors.apellido2.message : " "
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          id="email"
                          label="Email"
                          error={Boolean(errors.email)}
                          helperText={errors.email ? errors.email.message : " "}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          required
                          fullWidth
                          id="password"
                          label="Password"
                          type="password"
                          error={Boolean(errors.password)}
                          helperText={
                            errors.password ? errors.password.message : " "
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link to="/user/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
