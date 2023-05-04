import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useSelector } from "react-redux"
import SignIn from '../pages/SignIn'
import Dashboard from '../components/dashboard/Dashboard'
import Headquarters from '../pages/headquarters/Headquarters'
import Users from '../pages/users/Users'
import SignUp from '../pages/SignUp'
import HeadquartersReview from '../pages/headquarters/HeadquartersReview'

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
                            path: "*",
                            element: <Navigate to="/" />
                        },
                        {
                            path: "/",
                            element: <Headquarters/>
                        },
                        {
                            path: "/:id",
                            element: <HeadquartersReview />
                        },
                        {
                            path: "/users",
                            element: <Users/>
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
                },
                {
                    path: "/signup",
                    element: <SignUp />
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