import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useSelector } from "react-redux"
import SignIn from '../pages/SignIn'
import Dashboard from '../components/dashboard/Dashboard'
import Home from '../pages/Home'
import Headquarters from '../pages/headquarters/Headquarters'

export default function Routes() {

    const loggedIn = useSelector(state => state.auth.value)

    const router = createBrowserRouter(
        loggedIn ?
            [
                {
                    path: "/",
                    element: <Dashboard />,
                    children: [
                        {
                            path: "/",
                            element: <Home />
                        },
                        {
                            path: "/headquarters",
                            element: <Headquarters/>
                        },
                        {
                            path: "*",
                            element: <Navigate to="/" />
                        }
                    ]
                }
            ]
            :
            [
                {
                    path: "*",
                    element: <Navigate to="/login" />
                },
                {
                    path: "/login",
                    element: <SignIn />
                }
            ],
        {
            basename: import.meta.env.VITE_URL
        }
    )

    return (
        <RouterProvider router={router} />
    )
}