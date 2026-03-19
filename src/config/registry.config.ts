import { MfeKey } from '@fc-aiot-fe-share/types/federation.type';

export const MFE_REGISTRY: Record<
    MfeKey,
    {
        remote: () => Promise<any>;
        title?: string;
        preload?: boolean;
    }
> = {
    CRM_UNIT: {
        remote: () => import('crmModule/unitManager'),
        preload: true,
    },
    CRM_PRODUCT: {
        remote: () => import('crmModule/productManager'),
        preload: true,
    },
    CRM_DEALER: {
        remote: () => import('crmModule/dealerManager'),
        preload: true,
    },
    CRM_WAREHOUSE: {
        remote: () => import('crmModule/warehouseManager'),
        preload: true,
    },
    CRM_PRODUCT_ORDER: {
        remote: () => import('crmModule/productOrderManager'),
        preload: true,
    },
    CRM_PRODUCT_CATEGORIES: {
        remote: () => import('crmModule/productCategoriesManager'),
        preload: true,
    },
    CRM_COUNTRIES: {
        remote: () => import('crmModule/countryManager'),
        preload: true,
    },
    CRM_PROVINCES: {
        remote: () => import('crmModule/provinceManager'),
        preload: true,
    },
    CRM_DISTRICTS: {
        remote: () => import('crmModule/districtManager'),
        preload: true,
    },
    CRM_WARDS: {
        remote: () => import('crmModule/wardManager'),
        preload: true,
    },
    CRM_PRODUCT_ATTRIBUTE: {
        remote: () => import('crmModule/productAttributeManager'),
        preload: true,
    },
    CRM_BRAND: {
        remote: () => import('crmModule/brandManager'),
        preload: true,
    },
    CRM_MANUFACTURER: {
        remote: () => import('crmModule/manufacturerManager'),
        preload: true,
    },
    CRM_DEALER_LEVEL: {
        remote: () => import('crmModule/dealerLevelManager'),
        preload: true,
    },
    CRM_RECEIVE_WARRANTY: {
        remote: () => import('crmModule/receiveWarrantyManager'),
        preload: true,
    },
    CRM_VOUCHER: {
        remote: () => import('crmModule/voucherManager'),
        preload: true,
    },
    GLOBAL_LOCALE: {
        remote: () => import('globalModule/localeManager'),
        preload: true,
    },
    GLOBAL_MENU: {
        remote: () => import('globalModule/menuManager'),
        preload: true,
    },
    GLOBAL_ACCOUNT_ADMIN: {
        remote: () => import('globalModule/accountAdminManager'),
        preload: true,
    },
    GLOBAL_ACCOUNT_PROFESSOR: {
        remote: () => import('globalModule/accountProfessorManager'),
        preload: true,
    },
    GLOBAL_ACCOUNT_MASTER: {
        remote: () => import('globalModule/accountMasterManager'),
        preload: true,
    },
    GLOBAL_ACCOUNT_STANDARD: {
        remote: () => import('globalModule/accountStandardManager'),
        preload: true,
    },
    GLOBAL_ACCOUNT_USER: {
        remote: () => import('globalModule/accountUserManager'),
        preload: true,
    },
    GLOBAL_PERMISSION: {
        remote: () => import('globalModule/permissionControllerManager'),
        preload: true,
    },
    GLOBAL_ACCOUNT_GROUP: {
        remote: () => import('globalModule/accountGroupManager'),
        preload: true,
    },
    GLOBAL_FORMULA: {
        remote: () => import('globalModule/formulaManager'),
        preload: true,
    },
    GLOBAL_FORMULA_CONFIG: {
        remote: () => import('globalModule/formulaConfigManager'),
        preload: true,
    },
};
