import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@/app/App';
import { enableMocking } from '@/app/enable-mocking';
import { QueryProvider } from '@/app/providers/QueryProvider';

await enableMocking();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </StrictMode>,
);
