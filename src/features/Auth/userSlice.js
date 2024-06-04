import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import Storage_keys from '../../constants/storage-key';

export const register = createAsyncThunk('users/register', async (payload) => {
    const data = await userApi.register(payload);

    localStorage.setItem(Storage_keys.TOKEN, data.jwt);
    localStorage.setItem(Storage_keys.USER, JSON.stringify(data.user));
    return data.user;
});

export const login = createAsyncThunk('users/login', async (payload) => {
    const data = await userApi.login(payload);

    localStorage.setItem(Storage_keys.TOKEN, data.jwt);
    localStorage.setItem(Storage_keys.USER, JSON.stringify(data.user));
    return data.user;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(Storage_keys.USER)) || {},
        settings: {}
    },
    reducers: {
        logout(state) {
            localStorage.removeItem(Storage_keys.USER);
            localStorage.removeItem(Storage_keys.TOKEN);
            state.current = {};
        }
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload
        },
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.current = action.payload
        }
    }
})

const { reducer, actions } = userSlice;
export const { logout } = actions;
export default reducer;