import { useAppDispatch } from '@/hooks';
import { getByLangCodeAndResourceModule } from '@/redux/actions/locale.action';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
import i18n from '@fc-aiot-fe-share/react/providers/i18n/i18nConfiguration';
import { memo, PropsWithChildren, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';

const I18nProvider = memo(({ children }: PropsWithChildren) => {
    const [currentLanguage, setCurrentLanguage] = useState<string>(null);
    const [isReady, setIsReady] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        (async () => {
            const response = await dispatch(
                getByLangCodeAndResourceModule({
                    // langCode: currentLanguage,
                    // resourceModule: Number(process.env.LOCALE_MODULE_KEY),
                    langCode: 'VN',
                    resourceModule: LocaleModuleEnum.HostModule,
                })
            );
            const model = response?.data?.data?.model;
            if (model) {
                i18n.addResourceBundle('VN', 'translation', model, true, true);
                i18n.changeLanguage('VN');
                setIsReady(true);
            }
        })();
    }, []);

    return <I18nextProvider i18n={i18n}>{isReady ? children : children}</I18nextProvider>;
});

export { I18nProvider };
