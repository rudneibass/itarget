import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'

import Events from './pages/Events'
import Registrations from './pages/Registrations'
import Error from './pages/Error'

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Events />
      },
      {
        path: "/inscricoes",
        element: <Registrations />
      },
      {
        path: "/inscricoes/:eventId",
        element: <Registrations />
      }
    ]
  },
])