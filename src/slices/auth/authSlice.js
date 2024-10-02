import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        autenticaded: 'no-autenticaded',
    },
    reducers: {

        isAutenticade: (state) => {

            state.autenticaded = 'autenticaded';
        },
        isNoAutenticade: (state) => {

            state.autenticaded = 'no-autenticaded';
        }
    }
});

export const {isAutenticade, isNoAutenticade } = authSlice.actions;