import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const FormulaConfigPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="GLOBAL_FORMULA_CONFIG"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.FormulaConfigModule }}
            className="p-5"
        />
    );
};

export { FormulaConfigPage };
