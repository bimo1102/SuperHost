import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const ProductAttributePage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="CRM_PRODUCT_ATTRIBUTE"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.ProductAttributeModule }}
            className="p-5"
        />
    );
};

export { ProductAttributePage };
