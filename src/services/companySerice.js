import { laboratorioApi } from "../api";

export async function getAllCompaniesDB() {

    return await laboratorioApi.get('companies');
}

export async function storeCompanyDB(data) {

    return await laboratorioApi.post('companies', data);
}