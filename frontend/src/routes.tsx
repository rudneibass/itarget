import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'

import Error from '@pages/Error'

import RegistrationList from '@pages/Registration/list'
import RegistrationForm from '@pages/Registration/form'
import { RegistrationFormContextProvider } from '@pages/Registration/form/context.tsx'
import { RegistrationListContextProvider } from '@pages/Registration/list/context.tsx'

import EventList from '@pages/Event/list/'
import { EventListContextProvider } from '@pages/Event/list/context.tsx'

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
        path: "/registration",
        element: <RegistrationListContextProvider><RegistrationList /></RegistrationListContextProvider>
      },
      {
        path: "/registration/:eventId",
        element: <RegistrationFormContextProvider><RegistrationForm /></RegistrationFormContextProvider>
      },
      {
        path: "/registration/form/:id",
        element: 
        <RegistrationFormContextProvider>
          <RegistrationForm />
        </RegistrationFormContextProvider>
      }
    ]
  },
])