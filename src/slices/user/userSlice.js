import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
   name: 'user',
   initialState: {
    userInfo: {},
   },
   reducers: {
    
    isLoginUser: (state, { payload }) => {

        state.userInfo = payload;
        
    },

   }
});


// action creators are generation
export const { isLoginUser } = userSlice.actions;