import { KeenIcon, useMenuBreadcrumbs } from '@/components';
import { useMenus } from '@/providers';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';

const ToolbarBreadcrumbs = () => {
    const { t } = useTranslation();
    const { getMenuConfig } = useMenus();
    const { pathname } = useLocation();
    const items = useMenuBreadcrumbs(pathname, getMenuConfig('primary'));
    return (
        <div className="flex [.header_&]:below-lg:hidden items-center gap-1.25 text-xs lg:text-sm font-medium mb-2.5 lg:mb-0">
            <div className="breadcrumb flex items-center gap-1">
                {items.map((item, index) => (
                    <Fragment key={index}>
                        {item.path ? (
                            <Link to={item.path} className="flex items-center gap-1 text-gray-600 hover:text-primary">
                                {t(item.titleKey)}
                            </Link>
                        ) : (
                            <span className={index === items.length - 1 ? 'text-gray-700' : 'text-gray-700'}>
                                {t(item.titleKey)}
                            </span>
                        )}
                        {index !== items.length - 1 && <KeenIcon icon="right" className="text-gray-500 text-3xs" />}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export { ToolbarBreadcrumbs };
