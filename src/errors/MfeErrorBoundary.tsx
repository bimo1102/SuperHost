import { MfeKey } from '@fc-aiot-fe-share/types/federation.type';
import React from 'react';

type Props = {
    mfeKey: MfeKey;
    children: React.ReactNode;
};

type State = {
    hasError: boolean;
    error?: Error;
};

class MfeErrorBoundary extends React.Component<Props, State> {
    state: State = {
        hasError: false,
    };

    static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error,
        };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // Log tập trung (Sentry, Datadog, custom logger...)
        console.error(`[MFE ERROR] Module: ${this.props.mfeKey}`, error, info);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        const { hasError, error } = this.state;

        if (hasError) {
            return (
                <div className="mfe-error-boundary">
                    <h3>Không thể tải module</h3>

                    <p>
                        Module <strong>{this.props.mfeKey}</strong> gặp sự cố.
                    </p>

                    {process.env.NODE_ENV !== 'production' && error && (
                        <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{error.message}</pre>
                    )}

                    <button onClick={this.handleRetry}>Thử tải lại</button>
                </div>
            );
        }

        return this.props.children;
    }
}
export { MfeErrorBoundary };
