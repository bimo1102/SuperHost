import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const ManufacturerPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="CRM_MANUFACTURER"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.ManufacturerModule }}
            className="p-5"
        />
    );
};

export { ManufacturerPage };
