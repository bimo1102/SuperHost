import { GlobalLoader } from '@/components';
import { Toaster } from '@/components/ui/sonner';
import { PathnameProvider } from '@/providers';
import { useSettings } from '@/providers/SettingsProvider';
import { AppRoutingSetup } from '@/routing';
import { AUTH_LOCALSTORAGE_KEYS } from '@fc-aiot-fe-share/constant/common.constant';
import { removeData } from '@fc-aiot-fe-share/utils';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './hooks';

const App = () => {
    const { settings } = useSettings();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add(settings.themeMode);
    }, [settings]);

    useEffect(() => {
        const handleGlobalLogout = () => {
            removeData(AUTH_LOCALSTORAGE_KEYS.ACCESS_TOKEN);
            removeData(AUTH_LOCALSTORAGE_KEYS.REFRESH_TOKEN);
            removeData(AUTH_LOCALSTORAGE_KEYS.EXPIRES_AT);
            removeData('userInfo');
            navigate('/auth/login');
        };
        const handleGlobalForbidden = () => {
            navigate('/error/403');
        };
        const handleGlobal500 = () => {
            navigate('/error/500');
        };

        window.addEventListener('MFE_SIGNAL_LOGOUT', handleGlobalLogout);
        window.addEventListener('MFE_SIGNAL_FORBIDDEN', handleGlobalForbidden);
        window.addEventListener('MFE_SIGNAL_500', handleGlobal500);

        return () => {
            window.removeEventListener('MFE_SIGNAL_LOGOUT', handleGlobalLogout);
            window.removeEventListener('MFE_SIGNAL_FORBIDDEN', handleGlobalForbidden);
            window.removeEventListener('MFE_SIGNAL_500', handleGlobal500);
        };
    }, []);
    return (
        // <BrowserRouter basename={'/'}>
        <>
            <PathnameProvider>
                <AppRoutingSetup />
            </PathnameProvider>
            <GlobalLoader />
            <Toaster />
        </>
        // </BrowserRouter>
    );
};

export { App };
