import { laboratorioApi } from "../api";

export async function getCustomersByCompanyDB(idCompany) {

    return await laboratorioApi.get(`customers/companies/${ idCompany }`);
}

export async function storeCustomersByCompanyDB(data) {

    return await laboratorioApi.post(`customers`, data);
}

export async function updateCustomerDB(id, data) {

    return await laboratorioApi.patch(`customers/${ id }`, data);
}