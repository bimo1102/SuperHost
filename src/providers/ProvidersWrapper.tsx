import {
    I18nProvider,
    LayoutProvider,
    LoadersProvider,
    MenusProvider,
    ReduxProvider,
    SettingsProvider,
} from '@/providers';
import { PropsWithChildren } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router';

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
    return (
        <BrowserRouter basename={'/'}>
            <ReduxProvider>
                <SettingsProvider>
                    <I18nProvider>
                        <HelmetProvider>
                            <LayoutProvider>
                                <LoadersProvider>
                                    <MenusProvider>{children}</MenusProvider>
                                </LoadersProvider>
                            </LayoutProvider>
                        </HelmetProvider>
                    </I18nProvider>
                </SettingsProvider>
            </ReduxProvider>
        </BrowserRouter>
    );
};

export { ProvidersWrapper };
