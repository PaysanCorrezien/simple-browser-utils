import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    manifest_version: 3,
    permissions: ['storage', 'tabs'],
    background: {
      service_worker: 'entrypoints/background/index.ts',
      type: 'module',
    },
    options_ui: {
      page: 'entrypoints/options/index.html',
      open_in_tab: true,
    },
    chrome_url_overrides: {
      newtab: 'entrypoints/newtab/index.html'
    }
  },
});
