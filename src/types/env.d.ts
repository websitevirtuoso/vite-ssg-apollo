/// <reference types="vite" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_GRAPHQL_HTTP: string
  readonly VITE_GRAPHQL_SERVER: string
  readonly VITE_APP_NAME: string
  readonly VITE_GOOGLE_API_KEY: string
  readonly VITE_TINYMCE_KEY: string
  readonly VITE_DATATABLE_ITEMS: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
