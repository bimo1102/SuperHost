import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const BrandPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="CRM_BRAND"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.BrandModule }}
            className="p-5"
        />
    );
};

export { BrandPage };
