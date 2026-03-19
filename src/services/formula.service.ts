import { AxiosResponse } from 'axios';

import axiosClient from '@fc-aiot-fe-share/react/services/axios-instance';

import { BaseResponse } from '@fc-aiot-fe-share/types/common.type';
import { FormulaConfigExecuteStandardRequest } from '@fc-aiot-fe-share/types/formular.type';

const axiosInstance = axiosClient();

class FormulaService {
    private FORMULA_CONFIG_EXECUTE_STANDARD_URL: string = '/Account/FormulaConfigExecuteStandard';

    async formulaConfigExecuteStandard(request: FormulaConfigExecuteStandardRequest): Promise<
        AxiosResponse<
            BaseResponse<{
                models: Array<string>;
            }>
        >
    > {
        return axiosInstance.post(this.FORMULA_CONFIG_EXECUTE_STANDARD_URL, request);
    }
}

export default new FormulaService();
