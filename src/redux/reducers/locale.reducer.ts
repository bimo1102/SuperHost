import { CommonBaseReducerState } from '@fc-aiot-fe-share/types/redux.type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LocaleState extends CommonBaseReducerState<Record<string, string>> {}

const localeReducer = createSlice({
    name: 'localeReducer',
    initialState: {
        model: {},
    } as LocaleState,
    reducers: {
        setLocale(
            state,
            action: PayloadAction<{
                model: Record<string, string>;
            }>
        ) {
            const { model } = action.payload;
            state.model = model;
        },
    },
});

export const localeActions = localeReducer.actions;
export default localeReducer.reducer;
