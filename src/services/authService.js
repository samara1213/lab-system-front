import { laboratorioApi } from '../api';

export async function loginUserDB(use_correo, use_contrasena) {

    return await laboratorioApi.post('auth/login', {use_correo, use_contrasena});
}

export async function refreshToken() {

    return await laboratorioApi.get('auth/refreshToken');
}

export async function changePasswordDB(data) {

    return await  laboratorioApi.post('auth/changePassword',{...data});
}