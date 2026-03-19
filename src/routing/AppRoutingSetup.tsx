import { DefaultPage } from '@/pages/dashboards';

import { ReactElement } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router';

import { AuthPage } from '@/auth';
import { RequireAuth } from '@/auth/RequireAuth';
import { ErrorsRouting } from '@/errors';
import { MainLayout } from '@/layouts/mains';
import {
    AuthenticationAccountDeactivatedPage,
    AuthenticationGetStartedPage,
    AuthenticationWelcomeMessagePage,
} from '@/pages/authentication';
import {
    BrandPage,
    CountryPage,
    DealerLevelPage,
    DealerPage,
    DistrictPage,
    ManufacturerPage,
    ProductAttributePage,
    ProductCategoriesPage,
    ProductOrderPage,
    ProductPage,
    ProvincePage,
    ReceiveWarrantyPage,
    UnitPage,
    VoucherPage,
    WardPage,
    WarehousePage,
} from '@/pages/crm';
import {
    AccountAdminPage,
    AccountGroupPage,
    AccountMasterPage,
    AccountProfessorPage,
    AccountStandardPage,
    AccountUserPage,
    FormulaPage,
    LocalePage,
    MenuPage,
    PermissionPage,
} from '@/pages/global';
import { FormulaConfigPage } from '@/pages/global/FormulaConfigPage';
import { PathAccessGuardProvider } from '@/providers/index';

const AppRoutingSetup = (): ReactElement => {
    return (
        <Routes>
            <Route element={<RequireAuth />}>
                <Route element={<MainLayout />}>
                    <Route
                        element={
                            <PathAccessGuardProvider
                                children={
                                    <>
                                        <Outlet />
                                    </>
                                }
                            />
                        }>
                        <Route path="/" element={<DefaultPage />} />
                        <Route path="/global/locale" element={<LocalePage />} />
                        <Route path="/global/menu" element={<MenuPage />} />
                        <Route path="/global/account-admin-manager" element={<AccountAdminPage />} />
                        <Route path="/global/permission" element={<PermissionPage />} />
                        <Route path="/global/account-group" element={<AccountGroupPage />} />
                        <Route path="/global/account-professor-manager" element={<AccountProfessorPage />} />
                        <Route path="/global/account-master-manager" element={<AccountMasterPage />} />
                        <Route path="/global/account-standard-manager" element={<AccountStandardPage />} />
                        <Route path="/global/account-user-manager" element={<AccountUserPage />} />
                        <Route path="/global/formula" element={<FormulaPage />} />
                        <Route path="/global/formula-config" element={<FormulaConfigPage />} />

                        <Route path="/sales/product" element={<ProductPage />} />
                        <Route path="/sales/unit" element={<UnitPage />} />
                        <Route path="/sales/dealer" element={<DealerPage />} />
                        <Route path="/sales/product" element={<ProductPage />} />
                        <Route path="/sales/product-categories" element={<ProductCategoriesPage />} />
                        <Route path="/sales/product-order" element={<ProductOrderPage />} />
                        <Route path="/sales/product-attributes" element={<ProductAttributePage />} />
                        <Route path="/sales/brand" element={<BrandPage />} />
                        <Route path="/sales/manufacturer" element={<ManufacturerPage />} />
                        <Route path="/sales/dealer-level" element={<DealerLevelPage />} />
                        <Route path="/sales/dealer-level" element={<DealerLevelPage />} />
                        <Route path="/sales/voucher" element={<VoucherPage />} />

                        <Route path="/guarantee/receive-warranty" element={<ReceiveWarrantyPage />} />
                        <Route path="/address-master/countries" element={<CountryPage />} />
                        <Route path="/address-master/provinces" element={<ProvincePage />} />
                        <Route path="/address-master/districts" element={<DistrictPage />} />
                        <Route path="/address-master/wards" element={<WardPage />} />
                        <Route path="/warehouse" element={<WarehousePage />} />
                        <Route path="/auth/welcome-message" element={<AuthenticationWelcomeMessagePage />} />
                        <Route path="/auth/account-deactivated" element={<AuthenticationAccountDeactivatedPage />} />
                        <Route path="/authentication/get-started" element={<AuthenticationGetStartedPage />} />
                    </Route>
                </Route>
            </Route>
            <Route path="error/*" element={<ErrorsRouting />} />
            <Route path="auth/*" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/error/404" />} />
        </Routes>
    );
};

export { AppRoutingSetup };
