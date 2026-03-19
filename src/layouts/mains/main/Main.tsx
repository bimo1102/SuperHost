import { useMenuCurrentItem } from '@/components/menu';
import { useMenus } from '@/providers';
import { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router';
import { Footer, Header, Sidebar, useMainLayout } from '../';

const Main = () => {
    const { t } = useTranslation();
    const { layout } = useMainLayout();
    const { pathname } = useLocation();
    const { getMenuConfig } = useMenus();
    const menuConfig = getMenuConfig('primary');
    const menuItem = useMenuCurrentItem(pathname, menuConfig);

    useEffect(() => {
        const bodyClass = document.body.classList;

        // Add a class to the body element
        bodyClass.add('main');

        if (layout.options.sidebar.fixed) bodyClass.add('sidebar-fixed');
        if (layout.options.sidebar.collapse) bodyClass.add('sidebar-collapse');
        if (layout.options.header.fixed) bodyClass.add('header-fixed');

        // Remove the class when the component is unmounted
        return () => {
            bodyClass.remove('main');
            bodyClass.remove('sidebar-fixed');
            bodyClass.remove('sidebar-collapse');
            bodyClass.remove('header-fixed');
        };
    }, [layout]);

    useEffect(() => {
        const timer = setTimeout(() => {
            document.body.classList.add('layout-initialized');
        }, 1000); // 1000 milliseconds

        // Remove the class when the component is unmounted
        return () => {
            document.body.classList.remove('layout-initialized');
            clearTimeout(timer);
        };
    }, []);
    return (
        <Fragment>
            <Helmet>
                <title>{t(menuItem?.titleKey)}</title>
            </Helmet>

            <Sidebar />

            <div className="wrapper flex grow flex-col">
                <Header />

                {/* <main className="grow content pt-5" role="content">
                    <Outlet />
                </main> */}
                <main className="grow content" role="content">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </Fragment>
    );
};

export { Main };
