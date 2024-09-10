export type Builder = 'rsbuild' | 'vite' | 'farm'

export interface NuxliteConfigServer {
  port?: number
  proxy?: Record<string, any>
}

export interface NuxliteConfig {
  builder?: Builder
  server?: NuxliteConfigServer
}

export interface NuxliteContext {
  options: NuxliteConfig
}
