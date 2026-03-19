import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { LocaleModuleEnum } from '@fc-aiot-fe-share/enums/locale-string-resource.enum';
const FormulaPage = () => {
    const mfeProps = useFederationProps();
    return (
        <ReactMfeWrapper
            mfeKey="GLOBAL_FORMULA"
            mfeProps={{ ...mfeProps, resourceModule: LocaleModuleEnum.FormulaModule }}
            className="p-5"
        />
    );
};

export { FormulaPage };
