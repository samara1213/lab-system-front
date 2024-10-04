import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/home/HomePage"
import { UserPage } from "../pages/user/UserPage"
import { CompanyPage } from "../pages/company/CompanyPage"

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/usuarios" element={<UserPage />}></Route>
                <Route path="/companies" element={<CompanyPage />}></Route>
                <Route path="/*" element={ <Navigate to="/" /> }/> 
            </Routes>
        </>
    )
}
