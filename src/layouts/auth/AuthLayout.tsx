import useBodyClasses from '@/hooks/useBodyClasses';
import { toAbsoluteUrl } from '@fc-aiot-fe-share/utils';
import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { AuthLayoutProvider } from './AuthLayoutProvider';

const Layout = () => {
    // Applying body classes to set the background color in dark mode
    useBodyClasses('dark:bg-coal-500');

    return (
        <Fragment>
            <style>
                {`
          .page-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1200/bg-10.png')}');
          }
          .dark .page-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1200/bg-10-dark.png')}');
          }
        `}
            </style>
            <div className="flex items-center justify-center grow bg-center bg-no-repeat page-bg">
                <Outlet />
            </div>
        </Fragment>
    );
};

const AuthLayout = () => (
    <AuthLayoutProvider>
        <Layout />
    </AuthLayoutProvider>
);

export { AuthLayout };
