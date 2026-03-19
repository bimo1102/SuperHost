import { ThemeTypeConfigEnum } from '@fc-aiot-fe-share/enums/themes.enum';
import { AccountInfoResponse } from '@fc-aiot-fe-share/types/accountInfo.type';
import { FederationAppInitProps } from '@fc-aiot-fe-share/types/federation.type';
import { getData } from '@fc-aiot-fe-share/utils';
import { useMemo } from 'react';
import { useAppSelector } from './useAppStore';

const useFederationProps = (): FederationAppInitProps => {
    const userInfo = getData('userInfo');
    const { model } = useAppSelector((state) => state.locale);
    return useMemo(
        () => ({
            disableGlobalStylesInReactMFE: true,
            currentUser: userInfo as AccountInfoResponse,
            currentLanguageSelected: 'vi',
            currentTheme: ThemeTypeConfigEnum.defaultTheme,
            resourceModule: 0,
            navigate: async (commands, extras) => {
                console.log('Host navigate:', commands, extras);
                return true;
            },

            setLoading: () => console.log('Host loading'),
            unSetLoading: () => console.log('Host un-loading'),
            data$: null as any,
            queryParams: {},
            params: {},
            localeResources: model,
            responsive: {
                isDesktop: true,
                isXXl: false,
                isXl: true,
                isLg: true,
                isMobile: false,
            },

            setUpParams: (req) => req,

            // signalR: {
            //     status: 'Disconnected' as any,
            //     onConnectSubscribe$: null,
            //     onProcess: () => {},
            //     onEndProcess: () => {},
            //     onJoinToGroup: async () => {},
            //     onLeaveFromGroup: async () => {},
            //     onSend: async () => {},
            // },
            basename: '',
            showFileManagerDialog: () => {},
        }),
        []
    );
};
export { useFederationProps };
