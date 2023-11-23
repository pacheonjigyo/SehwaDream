interface Window {
  dataLayer: unknown[];
}

interface ImportMetaEnv {
  readonly VITE_CONFIG: string;
}

declare module "relay-runtime" {
  interface PayloadError {
    errors?: Record<string, string[] | undefined>;
  }
}

declare module "*.css";
