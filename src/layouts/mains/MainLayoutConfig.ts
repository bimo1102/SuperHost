import { type ILayoutConfig } from '@/providers';

// Defining the main layout configuration using the ILayoutConfig type
const MainLayoutConfig: ILayoutConfig = {
    // Setting the layout name to 'main-layout'
    name: 'main-layout',

    // Defining configuration options for the layout
    options: {
        // Sidebar configuration
        sidebar: {
            theme: 'dark', // Sidebar theme set to light
            fixed: true, // Sidebar is fixed in position
            collapse: false, // Sidebar is not collapsed by default
        },

        // Header configuration
        header: {
            fixed: true, // Header is fixed in position
        },
    },
};

export { MainLayoutConfig };
