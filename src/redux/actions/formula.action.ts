import { mergeLoadingActions } from '@fc-aiot-fe-share/react/providers/context/common.action';
import { FormulaConfigExecuteStandardRequest } from '@fc-aiot-fe-share/types/formular.type';

import { Dispatch } from '@/redux';
import formulaService from '@/services/formula.service';
export const formulaConfigExecuteStandard =
    (request: FormulaConfigExecuteStandardRequest, isLoading = true) =>
    async (dispatch: Dispatch) => {
        return mergeLoadingActions<{ models: Array<string> }>({
            dispatchRef: dispatch,
            isLoading,
            refetchCallback() {},
            callType: 'post',
            callback: async () => {
                const response = await formulaService.formulaConfigExecuteStandard(request);
                return response;
            },
        });
    };
