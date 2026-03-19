import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const PermissionPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="GLOBAL_PERMISSION"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.PermissionModule }}
            className="p-5"
        />
    );
};

export { PermissionPage };
