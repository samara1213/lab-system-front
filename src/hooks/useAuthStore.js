import { useDispatch, useSelector } from 'react-redux';
import { isAutenticade, isNoAutenticade } from '../slices/auth/authSlice';
import { isLoginUser } from '../slices/user/userSlice';
import { refreshToken } from '../services';

export const useAuthStore = () => { 

    const dispatch = useDispatch(); 

    const {autenticaded} = useSelector( state => state.auth); 

    /**
     * funcion que se  encarga de realizar la autenticacion del ussuario
     * y guardar los registros en redux
     * @param {*} data 
     */
    const startLogin = async (data) => {

        // agregamos en local stora el valor del token
        localStorage.setItem('token', data.token);

        // marcamos como autenticado
        dispatch(isAutenticade());

        // guardamos los datos del ussuario en redux
        dispatch(isLoginUser(data.data));

    }

    /**
     * funcion que se encarga de realizar el refresco del token
     * @returns 
     */
    const checkAuthToken = async() => {
      
        // se obtiene el token guardado
        const token = localStorage.getItem('token');
        
        // se valida que exista
        if(!token) return dispatch(isNoAutenticade);

        try {
            
            // llamamos el servicio que actualiza el toekn
            const {data} = await refreshToken();
          
            // se guarda el nuevo token en loscal stora
            localStorage.setItem('token', data.token);
        
            // marcamos como autenticado
            dispatch(isAutenticade());

            // guardamos los registros del ussuario
            dispatch(isLoginUser(data.data));            

        } catch (error) {

            console.log(error)

            localStorage.clear();
            dispatch(isNoAutenticade()); 
        }
    }

    /**
     * funcion que se encarga de realizar el cierre de sesion de un ususario
     */
    const logout = async() => {

        // marcamos como no autenticado
        dispatch(isNoAutenticade());

        // se limpia el localStora del token
        localStorage.clear();
    }


    return {
        autenticaded,
        startLogin,
        checkAuthToken,
        logout,
    }
    
 } 
