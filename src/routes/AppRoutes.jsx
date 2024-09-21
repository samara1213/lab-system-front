import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/home/HomePage"
import { UserPage } from "../pages/user/UserPage"

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/usuarios" element={<UserPage />}></Route>
                <Route path="/*" element={ <Navigate to="/" /> }/> 
            </Routes>
        </>
    )
}
