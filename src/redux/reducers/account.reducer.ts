import { LoginResponse } from '@fc-aiot-fe-share/types/account.type';
import { CommonBaseReducerState } from '@fc-aiot-fe-share/types/redux.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState extends CommonBaseReducerState<LoginResponse> {}

const accountReducer = createSlice({
    name: 'accountReducer',
    initialState: {} as AccountState,
    reducers: {
        setCurrentUser(
            state,
            action: PayloadAction<{
                model: LoginResponse;
            }>
        ) {
            const { model } = action.payload;
            state.model = model;
        },
    },
});

export const accountActions = accountReducer.actions;
export default accountReducer.reducer;
