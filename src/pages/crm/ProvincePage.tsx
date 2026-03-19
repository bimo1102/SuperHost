import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const ProvincePage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="CRM_PROVINCES"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.ProvinceModule }}
            className="p-5"
        />
    );
};

export { ProvincePage };
