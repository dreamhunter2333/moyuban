import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { Layout } from '@/components/layout';
import { HomePage } from '@/pages/home';
import { ToolsPage } from '@/pages/tools';

const ProgressPage = lazy(() => import('@/pages/progress').then((page) => ({ default: page.ProgressPage })));
const AboutPage = lazy(() => import('@/pages/about').then((page) => ({ default: page.AboutPage })));
const SettingsPage = lazy(() => import('@/pages/settings').then((page) => ({ default: page.SettingsPage })));
const PasswordPage = lazy(() => import('@/pages/tools/password').then((page) => ({ default: page.PasswordPage })));
const UrlEncoderPage = lazy(() => import('@/pages/tools/url-encoder').then((page) => ({ default: page.UrlEncoderPage })));
const Base64Page = lazy(() => import('@/pages/tools/base64').then((page) => ({ default: page.Base64Page })));
const ShareToolPage = lazy(() => import('@/pages/tools/share-tool').then((page) => ({ default: page.ShareToolPage })));

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="tools">
              <Route index element={<ToolsPage />} />
              <Route path="password" element={<PasswordPage />} />
              <Route path="url-encoder" element={<UrlEncoderPage />} />
              <Route path="base64" element={<Base64Page />} />
              <Route path="share-tool" element={<ShareToolPage />} />
            </Route>
            <Route path="progress" element={<ProgressPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
