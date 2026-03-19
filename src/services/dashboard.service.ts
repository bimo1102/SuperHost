import { AxiosResponse } from 'axios';

import axiosClient from '@fc-aiot-fe-share/react/services/axios-instance';
import { BaseResponse } from '@fc-aiot-fe-share/types/common.type';
import { DashboardAccountViewResponse } from '@fc-aiot-fe-share/types/dashboard.type';

const axiosInstance = axiosClient();

class DashboardService {
    private GET_DASHBOARD_VIEW: string = 'Dashboard/DashboardView';

    async getDashboardView(): Promise<AxiosResponse<BaseResponse<DashboardAccountViewResponse>>> {
        return axiosInstance.post(this.GET_DASHBOARD_VIEW);
    }
}

export default new DashboardService();
