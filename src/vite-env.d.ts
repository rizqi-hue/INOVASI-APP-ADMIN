/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASEURL: "http://localhost:3000",
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
