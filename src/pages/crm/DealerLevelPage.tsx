import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const DealerLevelPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="CRM_DEALER_LEVEL"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.DealerLevelModule }}
            className="p-5"
        />
    );
};

export { DealerLevelPage };
