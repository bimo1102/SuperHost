import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const VoucherPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="CRM_VOUCHER"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.VoucherModule }}
            className="p-5"
        />
    );
};

export { VoucherPage };
