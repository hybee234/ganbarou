import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
// import SearchBooks from './pages/SearchBooks'
// import SavedBooks from './pages/SavedBooks'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import MyTasks from './pages/MyTasks'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: ( 
            <div className = "justify-center, text-center">
                <h1 className='display-2'>We have encountered an error! (Main.jsx)</h1>
                <div>Allow this Chiikawa character to keep you company while you solve the issue</div>
                <div className = "text-center py-2"><img className = "m-auto py-2" width="200px" src="../assets/images/chiikawa loading 1.gif" /></div>        
            </div>   
        )
        ,
        children: [
        {
            index: true,
            element: <Welcome />
        },
        {
            path: 'login',
            element: <Login />
        },
        {
            path: 'signup',
            element: <Signup />
        },
        {
            path: 'mytasks',
            element: <MyTasks />
        },
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
