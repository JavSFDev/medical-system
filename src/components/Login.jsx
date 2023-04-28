import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

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
  ThemeProvider,
  Grid,
} from "@mui/material";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useSubmitForm } from "../hooks/useSubmitForm";
import { UserContext } from "../context/UserContext";
import vite from "../assets/vite.svg";

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

export function Login() {
  const navigate = useNavigate();
  const { saveUser } = useContext(UserContext);

  const loginSchema = yup.object({
    email: yup
      .string()
      .required("El email es requerido")
      .email("Formato email"),
    password: yup.string().required("El password es requerido"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const [formData, setData] = useState(null);
  const [start, setStart] = useState(false);
  const { responseData } = useSubmitForm({
    endpoint: "user/login",
    action: "POST",
    formData,
    start,
  });
  
  const onSubmit = (DataForm) => {
    try {
      setData(DataForm);
      setStart(true);
    } catch (err) {
      console.log(err)
    }
  };

  const onError = (errors, e) => console.log(errors, e);

  useEffect(() => {
    if (responseData != null && responseData != "Usuario no valido") {
      saveUser(responseData);
      return navigate("/");
    } else if (responseData == "Usuario no valido") {
      return navigate("/unauthorized");
    }
  }, [responseData]);

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
                Sign in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit(onSubmit, onError)}
                sx={{ mt: 1 }}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      error={Boolean(errors.email)}
                      helperText={errors.email ? errors.email.message : " "}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      error={Boolean(errors.password)}
                      helperText={
                        errors.password ? errors.password.message : " "
                      }
                    />
                  )}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/user/create" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
