interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENABLE_MSW?: string;
  readonly VITE_MSW_DELAY_MS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
