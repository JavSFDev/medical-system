import React from "react";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appTheme } from "../themes/theme.js";
import Container from "@mui/material/Container";
import { Toaster } from "react-hot-toast";

export function Layout({ children }) {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline enableColorScheme />
      <Header />
      <Container
        maxWidth={false}
        disableGutters
        // style={{ paddingTop: "1rem", paddingBottom: "4.5rem" }}
      >
        <Toaster position="top-center" />
        {children}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
