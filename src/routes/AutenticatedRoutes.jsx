import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../pages/auth/LoginPage'
import { ChangePassword } from '../pages/auth/ChangePassword'

export const AutenticatedRoutes = () => {
    return (
        <>
            <Routes>
                <Route path='/login' element={<LoginPage />}></Route>
                <Route path="/changePassword/:email" element={ <ChangePassword/> } />
                <Route path="/*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    )
}
