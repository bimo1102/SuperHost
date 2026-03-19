/* eslint-disable no-unused-vars */
import { MenuResponse, TMenuConfig } from '@fc-aiot-fe-share/types/menu.type';
import { createContext, type PropsWithChildren, useContext, useState } from 'react';

export interface IMenusProps {
    configs: Map<string, TMenuConfig | null>;
    setMenuConfig: (name: string, config: TMenuConfig | null) => void;
    getMenuConfig: (name: string) => TMenuConfig | null;
    setCurrentMenuItem: (config: MenuResponse | null) => void;
    getCurrentMenuItem: () => MenuResponse | null;
}

const initialProps: IMenusProps = {
    configs: new Map(),
    setMenuConfig: () => {},
    getMenuConfig: () => null,
    setCurrentMenuItem: () => {},
    getCurrentMenuItem: () => null,
};

const MenuContext = createContext<IMenusProps>(initialProps);
const useMenus = () => useContext(MenuContext);

const MenusProvider = ({ children }: PropsWithChildren) => {
    const [currentMenuItem, setCurrentMenuItem] = useState<MenuResponse | null>(null);
    const configs = initialProps.configs;

    const setMenuConfig = (name: string, config: TMenuConfig | null) => {
        configs.set(name, config);
    };

    const getCurrentMenuItem = (): MenuResponse | null => {
        return currentMenuItem;
    };

    const getMenuConfig = (name: string): TMenuConfig | null => {
        return configs.get(name) ?? null;
    };

    return (
        <MenuContext.Provider value={{ configs, setMenuConfig, getMenuConfig, setCurrentMenuItem, getCurrentMenuItem }}>
            {children}
        </MenuContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export { MenusProvider, useMenus };
