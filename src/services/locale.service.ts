import { AxiosResponse } from 'axios';

import axiosClient from '@fc-aiot-fe-share/react/services/axios-instance';
import { BaseResponse } from '@fc-aiot-fe-share/types/common.type';
import { LocaleGetByLangCodeAndResourceModuleRequest } from '@fc-aiot-fe-share/types/locale.type';

const axiosInstance = axiosClient();

class LocaleService {
    private GET_BY_LANG_CODE_AND_RESOURCE_MODULE_URL: string = '/Locale/GetByLangCodeAndResourceModule';

    async getByLangCodeAndResourceModule(request: LocaleGetByLangCodeAndResourceModuleRequest): Promise<
        AxiosResponse<
            BaseResponse<{
                model: Record<string, string>;
            }>
        >
    > {
        return axiosInstance.post(this.GET_BY_LANG_CODE_AND_RESOURCE_MODULE_URL, request);
    }
}

export default new LocaleService();
