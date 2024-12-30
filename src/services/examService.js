import { laboratorioApi } from "../api";

export async function getExamsByCompanyDB(idCompany) {

    return await laboratorioApi.get(`exams/companies/${ idCompany }`);
}

export async function storeExamenDB(data) {

    return await laboratorioApi.post('exams', data);
}

export async function updateExamenDB(id, data) {

    return await laboratorioApi.patch(`exams/${ id }`, data);
}

export async function getExanenByIdDB(id) {

    return await laboratorioApi.get(`exams/${ id }`);
}
