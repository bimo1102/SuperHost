import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { Container } from '@/components/container';
import { Toolbar, ToolbarActions, ToolbarHeading } from '@/layouts/mains/toolbar';
import { MainLightSidebarContent } from './MainLightSidebarContent';

const MainLightSidebarPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Container>
                <Toolbar>
                    <ToolbarHeading title={t('menu.dashboard')} description="" />
                    <ToolbarActions></ToolbarActions>
                </Toolbar>
            </Container>

            <Container>
                <MainLightSidebarContent />
            </Container>
        </>
    );
};

export { MainLightSidebarPage };
