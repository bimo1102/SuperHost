import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const ProductCategoriesPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="CRM_PRODUCT_CATEGORIES"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.ProductCategoryModule }}
            className="p-5"
        />
    );
};

export { ProductCategoriesPage };
