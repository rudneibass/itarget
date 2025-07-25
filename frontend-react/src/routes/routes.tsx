import { createBrowserRouter } from 'react-router-dom'
import App from '../App.tsx'
import Error from '@pages/Error'

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
      }
    ]
  },
])