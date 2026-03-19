import { useAppSelector } from '@/hooks/useAppStore';
import { AccountInfoResponse } from '@fc-aiot-fe-share/types/accountInfo.type';
import { Navigate, useLocation } from 'react-router-dom';

const PathAccessGuardProvider = ({ children }: { children: React.ReactElement }) => {
    const location = useLocation();

    const userInfoFromRedux = useAppSelector(
        (state) => state.common.federationResolver?.currentUser as AccountInfoResponse | undefined
    );

    if (!userInfoFromRedux || !userInfoFromRedux.permissionMenuPaths) {
        return null;
    }

    const allowedPaths = [...userInfoFromRedux.permissionMenuPaths, '/auth/welcome-message'];

    const currentPath = location.pathname.toLowerCase();
    const hasAccess = allowedPaths.includes(currentPath);

    if (!hasAccess) {
        return <Navigate to="/error/403" replace />;
    }

    return children;
};

export { PathAccessGuardProvider };
