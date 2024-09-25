import { createBrowserRouter } from 'react-router-dom'
import App from '../App.tsx'
import Error from '@pages/Error'

import RegistrationForm from '@pages/Modules/Registration/Form'
import RegistrationList from '@pages/Modules/Registration/List'
import EventList from '@pages/Modules/Event/List/'

import Home from '@pages/Home'

export const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home/> 
      },
      {
        path: "/event",
        element: <EventList />
      },
      {
        path: "/registration",
        element: <RegistrationList />
      },
      {
        path: "/registration/:eventId",
        element: <RegistrationForm />
      },
      {
        path: "/registration/form/:id",
        element: <RegistrationForm />
      }
    ]
  },
])