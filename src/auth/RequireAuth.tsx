import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { useAppDispatch } from '@/hooks';
import { getAccountInfo } from '@/redux/actions/accountInfo.action';
import { AUTH_LOCALSTORAGE_KEYS } from '@fc-aiot-fe-share/constant/common.constant';
import { getData } from '@fc-aiot-fe-share/utils';
import { useEffect } from 'react';
const RequireAuth = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const token = getData(AUTH_LOCALSTORAGE_KEYS.ACCESS_TOKEN);

    // const { actionLoading } = useAppSelector((state) => state.common.process);
    const fetchUser = async () => {
        await dispatch(getAccountInfo({}));
    };
    // const fetchTreeMenu = async () => {
    //     await dispatch(getTreeMenu());
    // };
    // const fetchLanguage = async () => {
    //     await dispatch(getByLangCodeAndResourceModule({ langCode: 'VNM', ResourceModule: 1 }));
    // };
    useEffect(() => {
        if (token) {
            fetchUser();
            // fetchTreeMenu();
            // fetchLanguage();
        }
    }, [token]);
    // if (!!actionLoading.getAccountInfo) {
    //     return <ScreenLoader />;
    // }
    return token ? <Outlet /> : <Navigate to="/auth/login" state={{ from: location }} replace />;
};

export { RequireAuth };
