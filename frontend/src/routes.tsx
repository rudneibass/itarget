import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'

import EventsList from './pages/Events'
import RegistrationsList from './pages/Registrations'
import RegistrationsForm from './pages/Registrations/form.tsx'
import Error from './pages/Error'

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <EventsList />
      },
      {
        path: "/inscricoes",
        element: <RegistrationsList />
      },
      {
        path: "/inscricoes/:eventId",
        element: <RegistrationsForm />
      }
    ]
  },
])