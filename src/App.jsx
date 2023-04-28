import "./App.css";
import React from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Auth } from "./components/Auth";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { Signup } from "./components/Signup";

import { SignupMed } from "./components/SignupMed";
import { Unauthorized } from "./components/Unauthorized";
import { UserProvider } from "./components/UserProvider";

import { TableUsers } from "./components/Administrador/TableUsers";
import { DetailUser } from "./components/Administrador/DetailUser";
import { FormConsulta } from "./components/FormConsulta";

//import { FormExpediente } from './components/FormExpediente'
import { TableCitas } from "./components/Agenda/TableCitas";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Medico", "Administrador"]} />,
    children: [
      {
        path: "consulta",
        element: <FormConsulta />,
      },
      {
        path: "consulta/:id",
        element: <FormConsulta />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Paciente", "Medico", "Administrador"]} />,
    children: [
      {
        path: "user/update/:id",
        element: <Signup />,
      },
      {
        path: "/citas",
        element: <TableCitas />,
      },
    ],
  },
  {
    path: "/",
    element: <Auth allowedRoles={["Administrador"]} />,
    children: [
      {
        path: "user/createMed/",
        element: <SignupMed />,
      },
      {
        path: "user/update/:id",
        element: <SignupMed />,
      },
      {
        path: "/users",
        element: <TableUsers />,
      },
      {
        path: "/users/:id",
        element: <DetailUser />,
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "user/login/",
    element: <Login />,
  },
  {
    path: "user/logout/",
    element: <Logout />,
  },
  {
    path: "user/create/",
    element: <Signup />,
  },
]);
export default function App() {
  return (
    <UserProvider>
      <Layout>
        <RouterProvider router={router} />
      </Layout>
    </UserProvider>
  );
}
