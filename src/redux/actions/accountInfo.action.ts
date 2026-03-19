import { Dispatch } from '@/redux';
import accountInfoService from '@/services/accountInfo.service';
import { mergeLoadingActions } from '@fc-aiot-fe-share/react/providers/context/common.action';
import { commonActions } from '@fc-aiot-fe-share/react/providers/context/common.reducer';
import { AccountInfoRequest, AccountInfoResponse } from '@fc-aiot-fe-share/types/accountInfo.type';
import { setData } from '@fc-aiot-fe-share/utils';
import { menuActions } from '../reducers/menu.reducer';

export const getAccountInfo =
    (request: AccountInfoRequest, isDispatch = true, isLoading = true) =>
    async (dispatch: Dispatch) => {
        return mergeLoadingActions<{
            model: AccountInfoResponse;
        }>({
            dispatchRef: dispatch,
            isLoading,
            refetchCallback() {
                dispatch(getAccountInfo(request));
            },
            callType: 'getAccountInfo',
            callback: async () => {
                const response = await accountInfoService.getAccountInfo(request);
                if (isDispatch) {
                    const userInfo = response?.data?.data?.model;
                    if (userInfo) {
                        dispatch(commonActions.setUserInfo(userInfo));
                        setData('userInfo', userInfo);
                        dispatch(menuActions.setTreeMenu({ models: userInfo.permissionMenus ?? [] }));
                        setData('menu', userInfo.permissionMenus ?? []);
                    }
                }
                return response;
            },
        });
    };
