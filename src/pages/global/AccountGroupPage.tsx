import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const AccountGroupPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="GLOBAL_ACCOUNT_GROUP"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.AccountGroupModule }}
            className="p-5"
        />
    );
};

export { AccountGroupPage };
