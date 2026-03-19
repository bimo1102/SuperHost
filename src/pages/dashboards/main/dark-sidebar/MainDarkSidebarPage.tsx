import { ReactMfeWrapper } from '@/components/federation-wrappers/react-wrapper/ReactMfeWrapper';
import { useFederationProps } from '@/hooks';
import { Fragment } from 'react';
const MainDarkSidebarPage = () => {
    const mfeProps = useFederationProps();

    return (
        <Fragment>
            {/* <Container>
                <Toolbar>
                    <ToolbarHeading title="Dashboard" description="Central Hub for Personal Customization" />
                    <ToolbarActions></ToolbarActions>
                </Toolbar>
            </Container>

            <Container>
                <MainLightSidebarContent />
            </Container> */}
            <ReactMfeWrapper mfeKey="WARRANTY" mfeProps={mfeProps} className="p-5" />
        </Fragment>
    );
};

export { MainDarkSidebarPage };
