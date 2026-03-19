import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const AccountMasterPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="GLOBAL_ACCOUNT_MASTER"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.AccountModule }}
            className="p-5"
        />
    );
};

export { AccountMasterPage };
