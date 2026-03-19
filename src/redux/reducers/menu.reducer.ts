import { MenuResponse } from '@fc-aiot-fe-share/types/menu.type';
import { CommonBaseReducerState } from '@fc-aiot-fe-share/types/redux.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState extends CommonBaseReducerState<MenuResponse> {}
const initialState: MenuState = {
    models: [],
};
const menuReducer = createSlice({
    name: 'MenuReducer',
    initialState,
    reducers: {
        setTreeMenu(
            state,
            action: PayloadAction<{
                models: Array<MenuResponse>;
            }>
        ) {
            const { models } = action.payload;
            state.models = models;
        },
    },
});

export const menuActions = menuReducer.actions;
export default menuReducer.reducer;
