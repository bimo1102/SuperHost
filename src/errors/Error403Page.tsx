import useBodyClasses from '@/hooks/useBodyClasses';
import { toAbsoluteUrl } from '@fc-aiot-fe-share/utils';
import { Link } from 'react-router';
import { Fragment } from 'react/jsx-runtime';

const ForbiddenPage = () => {
    // Thêm class dark mode giống các trang lỗi khác
    useBodyClasses('dark:bg-coal-500');

    return (
        <Fragment>
            <div className="mb-10">
                {/* Sử dụng illustration số 17 thường được dùng cho lỗi Permission/Security */}
                <img
                    src={toAbsoluteUrl('/media/illustrations/17.svg')}
                    className="dark:hidden max-h-[160px]"
                    alt="permission-denied"
                />
                <img
                    src={toAbsoluteUrl('/media/illustrations/17-dark.svg')}
                    className="light:hidden max-h-[160px]"
                    alt="permission-denied-dark"
                />
            </div>

            <span className="badge badge-danger badge-outline mb-3">403 Forbidden</span>

            <h3 className="text-2.5xl font-semibold text-gray-900 text-center mb-2">Access Denied</h3>

            <div className="text-md text-center text-gray-700 mb-10">
                You do not have permission to access this page. <br />
                Please contact your administrator or&nbsp;
                <Link to="/" className="text-primary font-medium hover:text-primary-active">
                    Return Home
                </Link>
                .
            </div>

            <button onClick={() => window.history.back()} className="btn btn-light flex justify-center">
                Go Back
            </button>
        </Fragment>
    );
};

export { ForbiddenPage };
