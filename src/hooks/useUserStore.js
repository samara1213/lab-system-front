import { useSelector } from "react-redux";


export const useUserStore = () => {

    const {userInfo} = useSelector( state => state.user); 

    return {
        
        userInfo,
    }
    
 } 
