import { laboratorioApi } from "../api";

export async function getExamsByCompanyDB(idCompany) {

    return await laboratorioApi.get(`exams/companies/${ idCompany }`);
}

export async function storeExamenDB(data) {
    console.log(data)
    return await laboratorioApi.post('exams', data);
}
