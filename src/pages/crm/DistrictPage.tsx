import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const DistrictPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="CRM_DISTRICTS"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.DistrictModule }}
            className="p-5"
        />
    );
};

export { DistrictPage };
