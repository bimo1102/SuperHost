import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const LocalePage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="GLOBAL_LOCALE"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.LocaleModule }}
            className="p-5"
        />
    );
};

export { LocalePage };
