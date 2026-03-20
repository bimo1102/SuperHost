import clsx from 'clsx';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { Alert, KeenIcon } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useLayout } from '@/providers';
import { signUp } from '@/redux/actions/account.action';
import { formulaConfigExecuteStandard } from '@/redux/actions/formula.action';
import { PASSWORD_REGEX, PHONE_NUMBER_REGEX } from '@fc-aiot-fe-share/constant/common.constant';
import { EAuthentication } from '@fc-aiot-fe-share/enums/account.enum';
import { SignupRequest } from '@fc-aiot-fe-share/types/account.type';
import { FormulaConfigExecuteStandardRequest } from '@fc-aiot-fe-share/types/formular.type';
import { Spin } from 'antd';
import { useTranslation } from 'react-i18next';

const initialValues: SignupRequest = {
    password: '',
    changepassword: '',
    acceptTerms: false,
    authType: EAuthentication.WebApp,
    fullName: '',
    userName: '',
    email: '',
    phoneNumber: '',
};

const signupSchema = Yup.object().shape({
    email: Yup.string().email('host.wrongEmailFormat'),
    phoneNumber: Yup.string()
        .matches(PHONE_NUMBER_REGEX, 'host.WrongPhoneNumberFormat')
        .required('host.phoneNumberRequired'),
    // .min(3, 'Minimum 3 symbols')
    // .max(50, 'Maximum 50 symbols')
    // .required('Email is required'),
    fullName: Yup.string()
        .min(3, 'host.minimumSymbols')
        .max(50, 'host.maximumSymbols')
        .required('host.fullnameRequired'),
    userName: Yup.string()
        .min(3, 'host.minimumSymbols')
        .max(50, 'host.maximumSymbols')
        .required('host.userNameRequired'),
    password: Yup.string()
        .min(8, 'host.passwordMinimumSymbols')
        .max(50, 'host.maximumSymbols')
        .required('host.passwordRequired')
        .matches(PASSWORD_REGEX, 'host.passwordInvalidFormat'),
    changepassword: Yup.string()
        .min(8, 'host.passwordMinimumSymbols')
        .max(50, 'host.maximumSymbols')
        .required('host.passwordConfirmationIsRequired')
        .matches(PASSWORD_REGEX, 'host.passwordInvalidFormat')
        .oneOf([Yup.ref('password')], "host.didn'tMatch"),
    acceptTerms: Yup.bool().required('host.mustAccept').oneOf([true], 'host.mustAccept'),
});

const Signup = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { currentLayout } = useLayout();
    const dispatch = useAppDispatch();
    const { actionLoading } = useAppSelector((state) => state.common.process);

    const formik = useFormik({
        initialValues,
        validationSchema: signupSchema,
        onSubmit: async (values, { setStatus, setSubmitting }) => {
            const { acceptTerms, changepassword, ...signUpPayload } = values;
            try {
                const response = await dispatch(signUp(signUpPayload));
                if (!response?.data.status) {
                    setSubmitting(false);
                    setStatus(t(response?.data.errorMessages?.[0] || 'host.incorrectSignUp'));
                    return;
                }
                onFormulaConfigExecuteStandard({ isCommitImmediate: true, prefix: '000A' });
                navigate(from, {
                    replace: true,
                    state: {
                        userName: values.userName,
                        password: values.password,
                    },
                });
            } catch {
                setStatus(t('host.incorrectSignUp'));
                setSubmitting(false);
            }
        },
    });

    const togglePassword = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setShowPassword(!showPassword);
    };

    const toggleConfirmPassword = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onFormulaConfigExecuteStandard = async (request: FormulaConfigExecuteStandardRequest) => {
        try {
            const response = await dispatch(formulaConfigExecuteStandard(request));
            if (!response?.data.status) {
                formik.setStatus(t('host.genUsernameFailed'));
                return;
            }

            const models = response?.data?.data?.models || [];
            if (models.length > 0) {
                formik.setFieldValue('userName', models[0]);
                formik.setStatus(null);
                // toast.success(t('host.genUsernameSuccess'), {
                //     style: {
                //         background: '#10b981',
                //         color: '#fff',
                //         border: '1px solid #059669',
                //     },
                //     position: 'top-center',
                // });
            }
        } catch (error) {
            formik.setStatus(t('host.genUsernameFailed'));
        } finally {
        }
    };
    useEffect(() => {
        onFormulaConfigExecuteStandard({ isCommitImmediate: false, prefix: '000A' });
    }, []);
    useEffect(() => {
        if (formik.submitCount > 0 && Object.keys(formik.errors).length > 0) {
            const firstErrorElement = document.querySelector('.is-invalid');

            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }, [formik.submitCount, formik.errors]);
    return (
        <Spin spinning={!!actionLoading.signUp || !!actionLoading.post}>
            <div className="card max-w-[400px] w-full">
                <form className="card-body flex flex-col gap-5 p-10" noValidate onSubmit={formik.handleSubmit}>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-900 leading-none">{t('host.signUp')}</h3>
                    </div>
                    {formik.status && <Alert variant="danger">{formik.status}</Alert>}
                    <div className="flex flex-col gap-1">
                        <label className="form-label text-gray-900">{t('host.email')}</label>
                        <label className="input">
                            <input
                                placeholder={t('host.input.email')}
                                type="email"
                                autoComplete="off"
                                {...formik.getFieldProps('email')}
                                className={clsx(
                                    'form-control bg-transparent',
                                    { 'is-invalid': formik.touched.email && formik.errors.email },
                                    {
                                        'is-valid': formik.touched.email && !formik.errors.email,
                                    }
                                )}
                            />
                        </label>
                        {formik.touched.email && formik.errors.email && (
                            <span role="alert" className="text-danger text-xs mt-1">
                                {t(formik.errors.email)}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="form-label text-gray-900">
                            {t('host.phoneNumber')}
                            <span className="text-danger">*</span>
                        </label>
                        <label className="input">
                            <input
                                placeholder={t('host.input.phoneNumber')}
                                type="text"
                                autoComplete="off"
                                {...formik.getFieldProps('phoneNumber')}
                                className={clsx(
                                    'form-control bg-transparent',
                                    { 'is-invalid': formik.touched.phoneNumber && formik.errors.phoneNumber },
                                    {
                                        'is-valid': formik.touched.phoneNumber && !formik.errors.phoneNumber,
                                    }
                                )}
                            />
                        </label>
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                            <span role="alert" className="text-danger text-xs mt-1">
                                {t(formik.errors.phoneNumber)}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="form-label text-gray-900">
                            {t('host.fullName')}
                            <span className="text-danger">*</span>
                        </label>
                        <label className="input">
                            <input
                                placeholder={t('host.enterFullName')}
                                type="text"
                                autoComplete="off"
                                {...formik.getFieldProps('fullName')}
                                className={clsx(
                                    'form-control bg-transparent',
                                    { 'is-invalid': formik.touched.fullName && formik.errors.fullName },
                                    {
                                        'is-valid': formik.touched.fullName && !formik.errors.fullName,
                                    }
                                )}
                            />
                        </label>
                        {formik.touched.fullName && formik.errors.fullName && (
                            <span role="alert" className="text-danger text-xs mt-1">
                                {t(formik.errors.fullName)}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1 mb-[-20px]">
                        <label className="form-label text-gray-900">
                            {t('host.userName')}
                            <span className="text-danger">*</span>
                        </label>
                        <label className="input">
                            <input
                                placeholder={t('host.enterUserName')}
                                type="text"
                                autoComplete="off"
                                disabled={true}
                                {...formik.getFieldProps('userName')}
                                className={clsx(
                                    'form-control bg-transparent',
                                    { 'is-invalid': formik.touched.userName && formik.errors.userName },
                                    {
                                        'is-valid': formik.touched.userName && !formik.errors.userName,
                                    }
                                )}
                            />
                        </label>
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onFormulaConfigExecuteStandard({ isCommitImmediate: false, prefix: '000A' });
                            }}
                            className="text-2sm link font-semibold justify-end ms-auto hover:text-primary-active transition-colors">
                            {t('host.reGenUsername')}
                        </a>
                        {formik.touched.userName && formik.errors.userName && (
                            <span role="alert" className="text-danger text-xs mt-1">
                                {t(formik.errors.userName)}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="form-label text-gray-900">
                            {t('host.password')}
                            <span className="text-danger">*</span>
                        </label>
                        <label className="input">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder={t('host.enterPassword')}
                                autoComplete="off"
                                {...formik.getFieldProps('password')}
                                className={clsx(
                                    'form-control bg-transparent',
                                    {
                                        'is-invalid': formik.touched.password && formik.errors.password,
                                    },
                                    {
                                        'is-valid': formik.touched.password && !formik.errors.password,
                                    }
                                )}
                            />
                            <button className="btn btn-icon" onClick={togglePassword}>
                                {/* <KeenIcon icon="eye" className={clsx('text-gray-500', { hidden: showPassword })} />
                                <KeenIcon
                                    icon="eye-slash"
                                    className={clsx('text-gray-500', { hidden: !showPassword })}
                                /> */}
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

                    <div className="flex flex-col gap-1">
                        <label className="form-label text-gray-900">
                            {t('host.confirmPassword')}
                            <span className="text-danger">*</span>
                        </label>
                        <label className="input">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder={t('host.reEnterPassword')}
                                autoComplete="off"
                                {...formik.getFieldProps('changepassword')}
                                className={clsx(
                                    'form-control bg-transparent',
                                    {
                                        'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
                                    },
                                    {
                                        'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
                                    }
                                )}
                            />
                            <button className="btn btn-icon" onClick={toggleConfirmPassword}>
                                {/* <KeenIcon
                                    icon="eye"
                                    className={clsx('text-gray-500', { hidden: showConfirmPassword })}
                                />
                                <KeenIcon
                                    icon="eye-slash"
                                    className={clsx('text-gray-500', { hidden: !showConfirmPassword })}
                                /> */}
                                {showConfirmPassword ? (
                                    <KeenIcon icon="eye-slash" className="text-gray-500" />
                                ) : (
                                    <KeenIcon icon="eye" className="text-gray-500" />
                                )}
                            </button>
                        </label>
                        {formik.touched.changepassword && formik.errors.changepassword && (
                            <span role="alert" className="text-danger text-xs mt-1">
                                {t(formik.errors.changepassword)}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="checkbox-group">
                            <input
                                className="checkbox checkbox-sm"
                                type="checkbox"
                                {...formik.getFieldProps('acceptTerms')}
                            />
                            <span className="checkbox-label">
                                {t('host.iAccept')}{' '}
                                <Link to="#" className="text-2sm link">
                                    {t('host.termsConditions')}
                                </Link>
                            </span>
                        </label>

                        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
                            <span role="alert" className="text-danger text-xs">
                                {t(formik.errors.acceptTerms)}
                            </span>
                        )}
                    </div>

                    <button type="submit" className="btn btn-primary flex justify-center grow">
                        {t('host.signUp')}
                    </button>
                    <div className="flex items-center justify-center font-medium">
                        <span className="text-2sm text-gray-600 me-1.5">{t('host.AlreadyHaveAnAccount')}</span>
                        <Link
                            to={currentLayout?.name === 'auth-branded' ? '/auth/login' : '/auth/classic/login'}
                            className="text-2sm link">
                            {t('host.signIn')}
                        </Link>
                    </div>
                </form>
            </div>
        </Spin>
    );
};

export { Signup };
