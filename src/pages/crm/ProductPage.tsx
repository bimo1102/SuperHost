import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const ProductPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="CRM_PRODUCT"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.ProductModule }}
            className="p-5"
        />
    );
};

export { ProductPage };
