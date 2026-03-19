import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const ProductOrderPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="CRM_PRODUCT_ORDER"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.ProductOrderModule }}
            className="p-5"
        />
    );
};

export { ProductOrderPage };
