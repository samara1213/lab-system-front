import { Navigate, Route, Routes } from "react-router-dom"
import { HomePage } from "../pages/home/HomePage"
import { UserPage } from "../pages/user/UserPage"
import { CompanyPage } from "../pages/company/CompanyPage"
import { CustomerPage } from "../pages/customer/CustomerPage"
import { Exam } from "../pages/exam/Exam"
import { Exam_parameter } from "../pages/exam_parameter/exam_parameter"

export const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/usuarios" element={<UserPage />}></Route>
                <Route path="/companies" element={<CompanyPage />}></Route>
                <Route path="/customers" element={<CustomerPage />}></Route>
                <Route path="/exams" element={<Exam/>}></Route>
                <Route path="/exam-parameters/:examId/:examName" element={ <Exam_parameter/> } />
                <Route path="/*" element={ <Navigate to="/" /> }/> 
            </Routes>
        </>
    )
}
