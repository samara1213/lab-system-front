import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/auth/LoginPage'

export const AutenticatedRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path="/*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    )
}
