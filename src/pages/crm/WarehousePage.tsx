import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const WarehousePage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="CRM_WAREHOUSE"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.WareHouseModule }}
            className="p-5"
        />
    );
};

export { WarehousePage };
