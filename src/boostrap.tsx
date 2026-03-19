import { createRoot } from 'react-dom/client';

import { App } from './App';
import { ProvidersWrapper } from './providers';

import '@/components/keenicons/assets/styles.css';
import '@/styles/globals.css';

const bootstrapApplication = () => {
    const rootElement = document.getElementById('root');
    rootElement?.classList.add('mfe-host');
    if (!rootElement) return;
    const root = createRoot(rootElement);
    root.render(
        <ProvidersWrapper>
            <App />
        </ProvidersWrapper>
    );
};

bootstrapApplication();
