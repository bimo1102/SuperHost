import { KeenIcon } from '@/components';
import { MenuBadge, MenuIcon, MenuItem, MenuLink, MenuSub, MenuTitle } from '@/components/menu';
import { I18N_LANGUAGES, TLanguage } from '@/i18n';
import { toAbsoluteUrl } from '@fc-aiot-fe-share/utils';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
// import { FormattedMessage } from 'react-intl';

interface IDropdownUserLanguagesProps {
    menuItemRef: any;
}

const DropdownUserLanguages = ({ menuItemRef }: IDropdownUserLanguagesProps) => {
    // const { currentLanguage, changeLanguage } = useLanguage();
    const isRTL = false;
    const { t } = useTranslation();
    const handleLanguage = (lang: TLanguage) => {
        // changeLanguage(lang);

        if (menuItemRef.current) {
            menuItemRef.current.hide(); // Call the closeMenu method to hide the submenu
        }
    };

    const buildItems = () => {
        return I18N_LANGUAGES.map((item, index) => (
            <MenuItem
                key={index}
                className={clsx(item.code === 'en' && 'active')}
                onClick={() => {
                    handleLanguage(item);
                }}>
                <MenuLink className="h-10">
                    <MenuIcon>
                        <img src={item.flag} className="inline-block size-4 rounded-full" alt={item.label} />
                    </MenuIcon>
                    <MenuTitle>{item.label}</MenuTitle>
                    {item.code === 'en' && (
                        <MenuBadge>
                            <KeenIcon icon="check-circle" style="solid" className="text-success text-base" />
                        </MenuBadge>
                    )}
                </MenuLink>
            </MenuItem>
        ));
    };

    return (
        <MenuItem
            toggle="dropdown"
            trigger="hover"
            dropdownProps={{
                placement: isRTL ? 'left-start' : 'right-start',
                modifiers: [
                    {
                        name: 'offset',
                        options: {
                            offset: isRTL ? [-10, 0] : [10, 0], // [skid, distance]
                        },
                    },
                ],
            }}>
            <MenuLink>
                <MenuIcon>
                    <KeenIcon icon="icon" />
                </MenuIcon>
                <MenuTitle>{t('host.language')}</MenuTitle>
                <div className="flex items-center gap-1.5 rounded-md border border-gray-300 text-gray-600 p-1.5 text-2xs font-medium shrink-0">
                    {'Việt Nam'}
                    <img
                        src={toAbsoluteUrl('/media/flags/vietnam.svg')}
                        className="inline-block size-3.5 rounded-full"
                        alt="{currentLanguage.label}"
                    />
                </div>
            </MenuLink>
            <MenuSub className="menu-default light:border-gray-300 w-[190px]">{buildItems()}</MenuSub>
        </MenuItem>
    );
};

export { DropdownUserLanguages };
