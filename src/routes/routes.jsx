import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useSelector } from "react-redux"
import SignIn from '../pages/SignIn'

export default function Routes() {

    const loggedIn = useSelector(state => state.auth.value)

    const router = createBrowserRouter(
        loggedIn ?
            [
                {
                    path: "/",
                    element: <SignIn />,
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