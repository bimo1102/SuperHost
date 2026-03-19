import { MFE_REGISTRY } from '@/config/registry.config';
import { MfeErrorBoundary } from '@/errors';
import { FederationAppInitProps, MfeKey } from '@fc-aiot-fe-share/types/federation.type';
import { safeRemoteLoader } from '@fc-aiot-fe-share/utils';
import React, { Suspense, useMemo } from 'react';

type Props = {
    mfeKey: MfeKey;
    mfeProps: FederationAppInitProps;
    fallback?: React.ReactNode;
    className?: string;
};

export const ReactMfeWrapper: React.FC<Props> = ({ mfeKey, mfeProps, fallback = 'Loading module...', className }) => {
    const RemoteComponent = useMemo(() => {
        const registryItem = MFE_REGISTRY[mfeKey];
        if (!registryItem) {
            throw new Error(`MFE with key "${mfeKey}" is not registered`);
        }

        return React.lazy(safeRemoteLoader(registryItem.remote));
    }, [mfeKey]);
    return (
        <div className={className ?? 'react-mfe-wrapper'}>
            <MfeErrorBoundary mfeKey={mfeKey}>
                <Suspense fallback={fallback}>
                    <RemoteComponent {...mfeProps} />
                </Suspense>
            </MfeErrorBoundary>
        </div>
    );
};
