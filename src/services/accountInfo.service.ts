import { AxiosResponse } from 'axios';

import axiosClient from '@fc-aiot-fe-share/react/services/axios-instance';
import { AccountInfoRequest, AccountInfoResponse } from '@fc-aiot-fe-share/types/accountInfo.type';
import { BaseResponse } from '@fc-aiot-fe-share/types/common.type';

const axiosInstance = axiosClient();

class accountInfoService {
    // private ADD_OR_CHANGE_ACCOUNT_INFO_URL: string = '/AccountInfo/AddOrChangeAccountInfo';
    private GET_ACCOUNT_INFO_URL: string = '/AccountInfo/GetAccountInfo';
    // private CHANGE_PERMISSION_URL: string = '/Account/ChangePermission';

    // async addOrChangeAccountInfo(request: SignupRequest): Promise<
    //     AxiosResponse<
    //         BaseResponse<{
    //             model: LoginResponse;
    //         }>
    //     >
    // > {
    //     return axiosInstance.post(this.ADD_OR_CHANGE_ACCOUNT_INFO_URL, request);
    // }

    async getAccountInfo(request: AccountInfoRequest): Promise<
        AxiosResponse<
            BaseResponse<{
                model: AccountInfoResponse;
            }>
        >
    > {
        return axiosInstance.post(this.GET_ACCOUNT_INFO_URL, request);
    }
    // async changePermission(request: LogoutRequest): Promise<AxiosResponse<BaseResponse<{}>>> {
    //     return axiosInstance.post(this.CHANGE_PERMISSION_URL, request);
    // }
}

export default new accountInfoService();
