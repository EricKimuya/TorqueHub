import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { ThemeProvider } from 'styled-components';

import { theme } from './theme/theme';
import GlobalStyle from './theme/GlobalStyle';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

/**
 * ── AUTH0 PLACEHOLDER CREDENTIALS ─────────────────────────────────
 * Temporary values so the app can run before the real Auth0
 * tenant/application is set up. Replace via .env once your Auth0
 * SPA application is created:
 *
 *   VITE_AUTH0_DOMAIN=your-tenant.us.auth0.com
 *   VITE_AUTH0_CLIENT_ID=your-real-client-id
 *
 * loginWithRedirect() will NOT work with placeholder values — it
 * will redirect to a broken URL. Everything else (isAuthenticated
 * checks, role rendering, route guards) works fine since
 * isAuthenticated just defaults to false.
 */
const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN || 'dev-placeholder.us.auth0.com';
const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID || 'placeholder-client-id';

function App() {
  return (
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Navbar />
          {/* Home is rendered by AppRoutes via the "/" route —
              do not also render <Home /> directly here, or it will
              appear stacked on top of every other page. */}
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </Auth0Provider>
  );
}

export default App;