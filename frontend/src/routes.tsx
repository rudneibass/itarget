import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'

import Error from '@pages/Error'

import RegistrationsList from '@pages/Registrations/list'
import RegistrationsForm from '@pages/Registrations/form'
import { RegistrationFormContextProvider } from '@pages/Registrations/form/context.tsx'
import { RegistrationListContextProvider } from '@pages/Registrations/list/context.tsx'

import EventList from '@pages/Events/list/'
import { EventListContextProvider } from '@pages/Events/list/context.tsx'

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <EventListContextProvider><EventList /></EventListContextProvider> 
      },
      {
        path: "/inscricoes",
        element: <RegistrationListContextProvider><RegistrationsList /></RegistrationListContextProvider>
      },
      {
        path: "/inscricoes/:eventId",
        element: <RegistrationFormContextProvider><RegistrationsForm /></RegistrationFormContextProvider>
      }
    ]
  },
])