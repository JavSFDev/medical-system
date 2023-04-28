import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import fondo from "./../imgs/expediente-medico-electronico.jpg";
import boton from "./../imgs/agengaMedica.jpg";
import Box from "@mui/material/Box";
import BlueButton from "./../components/utils/button";

export function Home() {
  return (
    <Container
      sx={{
        p: 4,
        backgroundImage: `url(${fondo})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
      maxWidth="xl"
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Expediente Médico
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Manejo confidencial de información médica. El contenido de la
            información del expediente clínico es confidencial, apegados a la
            normativa vigente del país, velamos por el cumplimiento de dicha
            condición con la aplicación de protocolos, reglamentos y políticas
            en el hospital.
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <BlueButton onClick={() => alert("¡Web en mantenimiento!")}>
              Ir a Expediente Médico
            </BlueButton>
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => alert("¡Web en mantenimiento!")}
              className="boton-seccion"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={boton}
                alt="Agenda Médica"
                style={{ width: "200px", height: "200px", borderRadius: "0px" }}
              />
            </button>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <BlueButton onClick={() => alert("¡Web en mantenimiento!")}>
              Agenda Exclusiva para uso Médico
            </BlueButton>
          </div>
        </Grid>

        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Directorio Médico
          </Typography>

          <Box
            border={1}
            borderColor="black"
            borderRadius={5}
            p={2}
            bgcolor="white"
            width={500}
            height={150}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            margin="auto"
            marginBottom={2} // Agregamos un margen inferior de 2 unidades
          >
            <Typography variant="h6">
              Contamos con los mejores expertos en el área médica. ¡Porque su
              salud es nuestra prioridad! Puedes consultar a nuestros
              especialistas aquí.
            </Typography>
            <div style={{ marginTop: "10px" }}>
              <BlueButton onClick={() => alert("¡Web en mantenimiento!")}>
                Especialidades Médicas
              </BlueButton>
            </div>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Citas en Línea
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Especialidades Médicas
          </Typography>
          <div style={{ marginTop: "10px", textAlign: "center" }}>
            <BlueButton onClick={() => alert("¡Web en mantenimiento!")}>
              Gestione su cita Aquí!!
            </BlueButton>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
