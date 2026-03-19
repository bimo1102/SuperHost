import localeReducer from '@/redux/reducers/locale.reducer';
import menuReducer from '@/redux/reducers/menu.reducer';
import commonReducer from '@fc-aiot-fe-share/react/providers/context/common.reducer';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    common: commonReducer,
    menu: menuReducer,
    locale: localeReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: false,
        }),
});

type RootState = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;

export { Dispatch, RootState, store };
