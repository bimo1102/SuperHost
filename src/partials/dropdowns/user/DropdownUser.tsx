// import { useAuthContext } from '@/auth';
import { KeenIcon } from '@/components';
import { MenuIcon, MenuItem, MenuLink, MenuSeparator, MenuSub, MenuTitle } from '@/components/menu';
import { useAppDispatch } from '@/hooks';
import { useSettings } from '@/providers/SettingsProvider';
import { logout } from '@/redux/actions/account.action';
import { AccountInfoResponse } from '@fc-aiot-fe-share/types/accountInfo.type';
import { getData, toAbsoluteUrl } from '@fc-aiot-fe-share/utils';
import { ChangeEvent, Fragment } from 'react';
// import { FormattedMessage } from 'react-intl';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { DropdownUserLanguages } from './DropdownUserLanguages';
interface IDropdownUserProps {
    menuItemRef: any;
}

const DropdownUser = ({ menuItemRef }: IDropdownUserProps) => {
    const { settings, storeSettings } = useSettings();
    const userInfo = getData('userInfo') as AccountInfoResponse;
    const isRTL = false;
    const navigate = useNavigate();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const handleThemeMode = (event: ChangeEvent<HTMLInputElement>) => {
        const newThemeMode = event.target.checked ? 'dark' : 'light';

        storeSettings({
            themeMode: newThemeMode,
        });
    };
    const logOut = async () => {
        await dispatch(logout({}));
        navigate('/', { replace: true });
    };
    const buildHeader = () => {
        return (
            <div className="flex items-center justify-between px-5 py-1.5 gap-1.5">
                <div className="flex items-center gap-2">
                    <img
                        className="size-9 rounded-full border-2 border-success"
                        src={toAbsoluteUrl('/media/avatars/blank.png')}
                        alt=""
                    />
                    <div className="flex flex-col gap-1.5">
                        <Link
                            to="/account/hoteme/get-stard"
                            className="text-sm text-gray-800 hover:text-primary font-semibold leading-none">
                            {userInfo?.fullName}
                        </Link>
                        <a
                            href="mailto:levanlam270920@gmail.com"
                            className="text-xs text-gray-600 hover:text-primary font-medium leading-none">
                            {userInfo?.companyName}
                        </a>
                    </div>
                </div>
                {/* <span className="badge badge-xs badge-primary badge-outline">Pro</span> */}
            </div>
        );
    };

    const buildMenu = () => {
        return (
            <Fragment>
                <MenuSeparator />
                <div className="flex flex-col">
                    <MenuItem>
                        <MenuLink path="/account/home/user-profile">
                            <MenuIcon>
                                <KeenIcon icon="profile-circle" />
                            </MenuIcon>
                            <MenuTitle>{t('host.myProfile')}</MenuTitle>
                        </MenuLink>
                    </MenuItem>
                    <DropdownUserLanguages menuItemRef={menuItemRef} />
                    <MenuSeparator />
                </div>
            </Fragment>
        );
    };

    const buildFooter = () => {
        return (
            <div className="flex flex-col">
                {/* <div className="menu-item mb-0.5">
                    <div className="menu-link">
                        <span className="menu-icon">
                            <KeenIcon icon="moon" />
                        </span>
                        <span className="menu-title">
                            <FormattedMessage id="USER.MENU.DARK_MODE" />
                        </span>
                        <label className="switch switch-sm">
                            <input
                                name="theme"
                                type="checkbox"
                                checked={settings.themeMode === 'dark'}
                                onChange={handleThemeMode}
                                value="1"
                            />
                        </label>
                    </div>
                </div> */}

                <div className="menu-item px-4 py-1.5">
                    <button type="button" onClick={logOut} className="btn btn-sm btn-light justify-center">
                        {t('host.logout')}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <MenuSub className="menu-default light:border-gray-300 w-[200px] md:w-[250px]" rootClassName="p-0">
            {buildHeader()}
            {buildMenu()}
            {buildFooter()}
        </MenuSub>
    );
};

export { DropdownUser };
