import { laboratorioApi } from "../api";

export async function getCustomersByCompanyDB(idCompany) {

    return await laboratorioApi.get(`customers/companies/${ idCompany }`);
}