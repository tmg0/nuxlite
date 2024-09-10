import type { RsbuildConfig } from '@rsbuild/core'
import type { UserConfig as FarmConfig } from '@farmfe/core'
import type { UserConfig as ViteConfig } from 'vite'

export type Builder = 'rsbuild' | 'vite' | 'farm'

export interface NuxliteConfigServer {
  port?: number
  proxy?: Record<string, any>
}

export interface NuxliteConfig {
  builder?: Builder
  server?: NuxliteConfigServer
  rsbuild?: RsbuildConfig
  farm?: FarmConfig
  vite?: ViteConfig
}

export interface NuxliteContext {
  options: NuxliteConfig
}
