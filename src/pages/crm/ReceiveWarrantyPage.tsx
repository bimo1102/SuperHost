import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const ReceiveWarrantyPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="CRM_RECEIVE_WARRANTY"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.ReceiveWarrantyModule }}
            className="p-5"
        />
    );
};

export { ReceiveWarrantyPage };
