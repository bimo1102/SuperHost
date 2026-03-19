import { mergeLoadingActions } from '@fc-aiot-fe-share/react/providers/context/common.action';

import { Dispatch } from '@/redux';
import menuService from '@/services/menu.service';
import { MenuResponse } from '@fc-aiot-fe-share/types/menu.type';
import { menuActions } from '../reducers/menu.reducer';

export const getTreeMenu =
    (isDispatch = true, isLoading = true) =>
    async (dispatch: Dispatch) => {
        return mergeLoadingActions<{ models: Array<MenuResponse> }>({
            dispatchRef: dispatch,
            isLoading,
            refetchCallback() {
                dispatch(getTreeMenu());
            },
            callType: 'treeMenu',
            callback: async () => {
                const response = await menuService.getTreeMenu();
                if (isDispatch) {
                    const models = response?.data?.data?.models || [];
                    dispatch(menuActions.setTreeMenu({ models }));
                }
                return response;
            },
        });
    };
