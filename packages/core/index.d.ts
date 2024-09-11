declare module '@nuxlite/core' {
  import type { NuxliteConfig } from '@nuxlite/builder'

  export function defineConfig<T extends NuxliteConfig>(options: T): NuxliteConfig
}
