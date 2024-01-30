import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
// import SearchBooks from './pages/SearchBooks'
// import SavedBooks from './pages/SavedBooks'
import Welcome from './pages/Welcome'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h1 className='display-2'>Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Welcome />
      },
      
      // {
      //   path: '/search',
      //   element: <SearchBooks />
      // },
      // {
      //   path: '/saved',
      //   element: <SavedBooks />
      // }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
