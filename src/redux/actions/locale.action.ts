import { Dispatch } from '@/redux';
import localeService from '@/services/locale.service';
import { mergeLoadingActions } from '@fc-aiot-fe-share/react/providers/context/common.action';
import { LocaleGetByLangCodeAndResourceModuleRequest } from '@fc-aiot-fe-share/types/locale.type';
import { localeActions } from '../reducers/locale.reducer';

export const getByLangCodeAndResourceModule =
    (request: LocaleGetByLangCodeAndResourceModuleRequest, isLoading = true) =>
    async (dispatch: Dispatch) => {
        return mergeLoadingActions<{
            model: Record<string, string>;
        }>({
            dispatchRef: dispatch,
            isLoading,
            refetchCallback() {
                (dispatch as any)(getByLangCodeAndResourceModule(request));
            },
            callType: 'searchLocale',
            callback: async () => {
                const response = await localeService.getByLangCodeAndResourceModule(request);
                const model = response?.data?.data?.model;
                if (model) {
                    dispatch(localeActions.setLocale({ model }));
                }
                return response;
            },
        });
    };
