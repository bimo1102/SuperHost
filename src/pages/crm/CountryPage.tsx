import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const CountryPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="CRM_COUNTRIES"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.CountryModule }}
            className="p-5"
        />
    );
};

export { CountryPage };
