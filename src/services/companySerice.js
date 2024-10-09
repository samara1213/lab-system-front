import { laboratorioApi } from "../api";

export async function getAllCompaniesDB() {

    return await laboratorioApi.get('companies');
}