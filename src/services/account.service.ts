import { AxiosResponse } from 'axios';

import axiosClient from '@fc-aiot-fe-share/react/services/axios-instance';
import {
    LoginRequest,
    LoginResponse,
    LogoutRequest,
    RefreshTokenRequest,
    SignupRequest,
} from '@fc-aiot-fe-share/types/account.type';
import { BaseResponse } from '@fc-aiot-fe-share/types/common.type';

const axiosInstance = axiosClient();

class accountService {
    private SIGN_UP_URL: string = '/Account/Signup';
    private LOGIN_URL: string = '/Account/Login';
    private LOGOUT_URL: string = '/Account/Logout';
    private REFRESH_TOKEN_URL: string = '/Account/RefreshToken';

    async signUp(request: SignupRequest): Promise<
        AxiosResponse<
            BaseResponse<{
                model: LoginResponse;
            }>
        >
    > {
        return axiosInstance.post(this.SIGN_UP_URL, request);
    }
    async login(request: LoginRequest): Promise<
        AxiosResponse<
            BaseResponse<{
                model: LoginResponse;
            }>
        >
    > {
        return axiosInstance.post(this.LOGIN_URL, request);
    }
    async refreshToken(request: RefreshTokenRequest): Promise<
        AxiosResponse<
            BaseResponse<{
                model: LoginResponse;
            }>
        >
    > {
        return axiosInstance.post(this.REFRESH_TOKEN_URL, request);
    }
    async logout(request: LogoutRequest): Promise<AxiosResponse<BaseResponse<{}>>> {
        return axiosInstance.post(this.LOGOUT_URL, request);
    }
}

export default new accountService();
