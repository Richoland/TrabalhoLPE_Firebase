// fontes do MUI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenuPrincipal from "./componentes/MenuPrincipal";
import Sobre from "./componentes/Sobre";
import NotFound from "./componentes/NotFound";
import Home from "./componentes/telas/home/Home";
import Login from "./componentes/telas/login/Login";
import Posts from "./componentes/telas/posts/Posts";
import Tasks from "./componentes/telas/tasks/Tasks"; // Importação do componente Tasks

const router = createBrowserRouter([
  {
    path: "/",
    element: <MenuPrincipal />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "sobre",
        element: <Sobre />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "posts",
        element: <Posts />,
      },
      {
        path: "tasks", // Novo caminho para Tasks
        element: <Tasks />, // Componente associado
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
