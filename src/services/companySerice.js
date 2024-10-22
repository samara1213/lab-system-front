import { laboratorioApi } from "../api";

export async function getAllCompaniesDB() {

    return await laboratorioApi.get('companies');
}

export async function storeCompanyDB(data) {

    return await laboratorioApi.post('companies', data);
}

export async function updateCompanyDB(id, data) {

    return await laboratorioApi.patch(`companies/${ id }`, data);
    
}

export async function inactiveCompanyDB(id) {

    return await laboratorioApi.put(`companies/${ id }`);
    
}