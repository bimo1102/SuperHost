import { AxiosResponse } from 'axios';

import axiosClient from '@fc-aiot-fe-share/react/services/axios-instance';
import { BaseResponse } from '@fc-aiot-fe-share/types/common.type';
import { MenuResponse } from '@fc-aiot-fe-share/types/menu.type';

const axiosInstance = axiosClient();

class MenuService {
    private GET_TREE_MENU_URL: string = '/Menu/GetTreeMenu';

    async getTreeMenu(): Promise<
        AxiosResponse<
            BaseResponse<{
                models: Array<MenuResponse>;
            }>
        >
    > {
        return axiosInstance.post(this.GET_TREE_MENU_URL);
    }
}

export default new MenuService();
