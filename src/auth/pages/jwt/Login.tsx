import { Alert, KeenIcon } from '@/components';
import { useAppDispatch } from '@/hooks';
import { useLayout } from '@/providers';
import { login } from '@/redux/actions/account.action';
import { AUTH_LOCALSTORAGE_KEYS } from '@fc-aiot-fe-share/constant/common.constant';
import { EAuthentication, ELoginType } from '@fc-aiot-fe-share/enums/account.enum';
import { LoginRequest } from '@fc-aiot-fe-share/types/account.type';
import { removeData, setData } from '@fc-aiot-fe-share/utils';
import clsx from 'clsx';
import { useFormik } from 'formik';
import { type MouseEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const loginSchema = Yup.object().shape({
    userName: Yup.string()
        // .min(3, 'host.minimumSymbols')
        // .max(50, 'host.maximumSymbols')
        .required('host.userNameRequired'),
    password: Yup.string()
        // .min(8, 'host.passwordMinimumSymbols')
        // .max(50, 'host.maximumSymbols')
        .required('host.passwordRequired'),
    // .matches(PASSWORD_REGEX, 'host.passwordInvalidFormat'),
    // remember: Yup.boolean(),
});

const initialValues: LoginRequest = {
    userName: '',
    password: '',
    remember: true,
    authType: EAuthentication.WebApp,
    loginType: ELoginType.Default,
};

const Login = () => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const signupData = location?.state?.from?.state as { userName?: string; password?: string } | null;

    const [showPassword, setShowPassword] = useState(false);
    const { currentLayout } = useLayout();
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            setLoading(true);
            const { remember, ...loginPayload } = values;
            try {
                // removeCookie(AUTH_COOKIE_KEYS.ACCESS_TOKEN);
                // removeCookie(AUTH_COOKIE_KEYS.REFRESH_TOKEN);
                // removeCookie(AUTH_COOKIE_KEYS.EXPIRES_AT);
                removeData(AUTH_LOCALSTORAGE_KEYS.ACCESS_TOKEN);
                removeData(AUTH_LOCALSTORAGE_KEYS.REFRESH_TOKEN);
                removeData(AUTH_LOCALSTORAGE_KEYS.EXPIRES_AT);
                const response = await dispatch(login(loginPayload));
                if (!response?.data.status) {
                    setStatus(t('host.incorrectUserNameOrPassword'));
                    return;
                }
                values.remember ? setData('userName', values.userName) : removeData('userName');
                navigate(from, { replace: true });
            } catch {
                setStatus(t('host.incorrectUserNameOrPassword'));
                setSubmitting(false);
            }
            setLoading(false);
        },
    });

    const togglePassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };
    useEffect(() => {
        if (signupData?.userName || signupData?.password) {
            if (signupData.userName) {
                formik.setFieldValue('userName', signupData.userName);
            }
            if (signupData.password) {
                formik.setFieldValue('password', signupData.password);
            }
            formik.setFieldTouched('userName', true);
            formik.setFieldTouched('password', true);
        }
    }, [signupData]);
    return (
        <div className="card max-w-[400px] w-full">
            <form className="card-body flex flex-col gap-5 p-10" onSubmit={formik.handleSubmit} noValidate>
                <div className="text-center mb-2.5">
                    <h3 className="text-lg font-semibold text-gray-900 leading-none"> {t('host.signIn')}</h3>
                </div>
                {formik.status && <Alert variant="danger">{formik.status}</Alert>}
                <div className="flex flex-col gap-1">
                    <label className="form-label text-gray-900 mb-1">
                        {t('host.userName')}
                        {/* <span className="text-danger">*</span> */}
                    </label>
                    <label className="input">
                        <input
                            placeholder={t('host.enterUserName')}
                            autoComplete="off"
                            {...formik.getFieldProps('userName')}
                            className={clsx('form-control', {
                                'is-invalid': formik.touched.userName && formik.errors.userName,
                            })}
                        />
                    </label>
                    {formik.touched.userName && formik.errors.userName && (
                        <span role="alert" className="text-danger text-xs mt-1">
                            {t(formik.errors.userName)}
                        </span>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-1">
                        <label className="form-label text-gray-900 mb-1">
                            {t('host.password')}
                            {/* <span className="text-danger">*</span> */}
                        </label>
                        <Link
                            to={
                                currentLayout?.name === 'auth-branded'
                                    ? '/auth/reset-password'
                                    : '/auth/classic/reset-password'
                            }
                            className="text-2sm link shrink-0">
                            {t('host.forgotPassword')}
                        </Link>
                    </div>
                    <label className="input">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder={t('host.enterPassword')}
                            autoComplete="off"
                            {...formik.getFieldProps('password')}
                            className={clsx('form-control', {
                                'is-invalid': formik.touched.password && formik.errors.password,
                            })}
                        />
                        <button type="button" className="btn btn-icon" onClick={togglePassword}>
                            {/* <KeenIcon icon="eye" className={clsx('text-gray-500', { hidden: showPassword })} />
                            <KeenIcon icon="eye-slash" className={clsx('text-gray-500', { hidden: !showPassword })} /> */}
                            {showPassword ? (
                                <KeenIcon icon="eye-slash" className="text-gray-500" />
                            ) : (
                                <KeenIcon icon="eye" className="text-gray-500" />
                            )}
                        </button>
                    </label>
                    {formik.touched.password && formik.errors.password && (
                        <span role="alert" className="text-danger text-xs mt-1">
                            {t(formik.errors.password)}
                        </span>
                    )}
                </div>

                <label className="checkbox-group">
                    <input className="checkbox checkbox-sm" type="checkbox" {...formik.getFieldProps('remember')} />
                    <span className="checkbox-label">{t('host.rememberMe')}</span>
                </label>

                <button
                    type="submit"
                    className="btn btn-primary flex justify-center grow"
                    disabled={loading || formik.isSubmitting}>
                    {loading ? t('host.pleaseWait') : t('host.signIn')}
                </button>
                <div className="flex items-center justify-center font-medium">
                    <span className="text-2sm text-gray-600 me-1.5">{t('host.needAnAccount')}</span>
                    <Link
                        to={currentLayout?.name === 'auth-branded' ? '/auth/signup' : '/auth/classic/signup'}
                        className="text-2sm link">
                        {t('host.signUp')}
                    </Link>
                </div>
            </form>
        </div>
    );
};

export { Login };
