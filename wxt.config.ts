import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    manifest_version: 3,
    permissions: ['storage', 'tabs', 'scripting'],
    host_permissions: ['<all_urls>'],
    background: {
      service_worker: 'entrypoints/background/index.ts',
      type: 'module',
    },
    chrome_url_overrides: {
      newtab: 'entrypoints/newtab/index.html'
    }
  }
});
