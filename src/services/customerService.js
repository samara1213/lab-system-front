import { laboratorioApi } from "../api";

export async function getCustomersByCompanyDB(idCompany) {

    return await laboratorioApi.get(`customers/companies/${ idCompany }`);
}

export async function storeCustomersByCompanyDB(data) {

    return await laboratorioApi.post(`customers`, data);
}