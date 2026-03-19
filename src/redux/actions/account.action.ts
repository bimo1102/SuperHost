import { Dispatch } from '@/redux';
import accountService from '@/services/account.service';
import { AUTH_LOCALSTORAGE_KEYS } from '@fc-aiot-fe-share/constant/common.constant';
import { mergeLoadingActions } from '@fc-aiot-fe-share/react/providers/context/common.action';
import { commonActions } from '@fc-aiot-fe-share/react/providers/context/common.reducer';
import {
    LoginRequest,
    LoginResponse,
    LogoutRequest,
    RefreshTokenRequest,
    SignupRequest,
} from '@fc-aiot-fe-share/types/account.type';
import { removeData, setData } from '@fc-aiot-fe-share/utils';

export const signUp =
    (request: SignupRequest, isDispatch = true, isLoading = true) =>
    async (dispatch: Dispatch) => {
        return mergeLoadingActions<{
            model: LoginResponse;
        }>({
            dispatchRef: dispatch,
            isLoading,
            refetchCallback() {
                dispatch(signUp(request));
            },
            callType: 'signUp',
            callback: async () => {
                const response = await accountService.signUp(request);
                return response;
            },
        });
    };

export const login =
    (request: LoginRequest, isDispatch = true, isLoading = true) =>
    async (dispatch: Dispatch) => {
        return mergeLoadingActions<{
            model: LoginResponse;
        }>({
            dispatchRef: dispatch,
            isLoading,
            refetchCallback() {
                dispatch(login(request));
            },
            callType: 'login',
            callback: async () => {
                const response = await accountService.login(request);
                if (isDispatch) {
                    const userInfo = response?.data?.data?.model;
                    const tokenResponse = userInfo?.token;
                    const refreshTokenResponse = userInfo.refreshToken;
                    const minuteExpireResponse = new Date(Date.now() + userInfo?.minuteExpire * 1000);
                    // setCookie(AUTH_COOKIE_KEYS.ACCESS_TOKEN, tokenResponse, { expires: minuteExpireResponse });
                    // setCookie(AUTH_COOKIE_KEYS.REFRESH_TOKEN, refreshTokenResponse, { expires: minuteExpireResponse });
                    // setCookie(AUTH_COOKIE_KEYS.EXPIRES_AT, minuteExpireResponse, { expires: minuteExpireResponse });
                    setData(AUTH_LOCALSTORAGE_KEYS.ACCESS_TOKEN, tokenResponse);
                    setData(AUTH_LOCALSTORAGE_KEYS.REFRESH_TOKEN, refreshTokenResponse);
                    setData(AUTH_LOCALSTORAGE_KEYS.EXPIRES_AT, minuteExpireResponse);
                }
                return response;
            },
        });
    };
export const refreshToken =
    (request: RefreshTokenRequest, isDispatch = true, isLoading = true) =>
    async (dispatch: Dispatch) => {
        return mergeLoadingActions<{
            model: LoginResponse;
        }>({
            dispatchRef: dispatch,
            isLoading,
            refetchCallback() {},
            callType: 'refreshToken',
            callback: async () => {
                const response = await accountService.refreshToken(request);
                return response;
            },
        });
    };
export const logout =
    (request: LogoutRequest, isDispatch = true, isLoading = true) =>
    async (dispatch: Dispatch) => {
        return mergeLoadingActions<{}>({
            dispatchRef: dispatch,
            isLoading,
            refetchCallback() {
                dispatch(logout(request));
            },
            callType: 'logout',
            callback: async () => {
                const response = await accountService.logout(request);
                if (isDispatch) {
                    // removeCookie(AUTH_COOKIE_KEYS.ACCESS_TOKEN);
                    // removeCookie(AUTH_COOKIE_KEYS.REFRESH_TOKEN);
                    // removeCookie(AUTH_COOKIE_KEYS.EXPIRES_AT);
                    removeData(AUTH_LOCALSTORAGE_KEYS.ACCESS_TOKEN);
                    removeData(AUTH_LOCALSTORAGE_KEYS.REFRESH_TOKEN);
                    removeData(AUTH_LOCALSTORAGE_KEYS.EXPIRES_AT);
                    removeData('userInfo');
                    dispatch(commonActions.setUserInfo(null));
                }

                return response;
            },
        });
    };
