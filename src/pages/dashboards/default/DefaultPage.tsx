import { useLayout } from '@/providers';
import { MainLightSidebarPage } from '../';

const DefaultPage = () => {
    const { currentLayout } = useLayout();

    if (currentLayout?.name === 'main-layout') {
        return <MainLightSidebarPage />;
    }
};

export { DefaultPage };
