import useBodyClasses from '@/hooks/useBodyClasses';
import { Main, MainLayoutProvider } from '.';

const MainLayout = () => {
    // Using the useBodyClasses hook to set background styles for light and dark modes
    useBodyClasses(`
    [--tw-page-bg:#fefefe]
    [--tw-page-bg-dark:var(--tw-coal-500)]
    main 
    sidebar-fixed 
    header-fixed 
    bg-[--tw-page-bg]
    dark:bg-[--tw-page-bg-dark]
  `);

    return (
        <MainLayoutProvider>
            <Main />
        </MainLayoutProvider>
    );
};

export { MainLayout };
