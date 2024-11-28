import { laboratorioApi } from "../api";

export async function getExamsByCompanyDB(idCompany) {

    return await laboratorioApi.get(`exams/companies/${ idCompany }`);
}
