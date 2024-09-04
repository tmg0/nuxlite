/// <reference types="@rsbuild/core/types" />
/// <reference types="vite/client" />
/// <reference types="unplugin-vue-router/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  // biome-ignore lint/complexity/noBannedTypes: reason
  const component: DefineComponent<unknown, unknown, any>
  export default component
}

declare module 'vue-router/auto-routes' {
  const routes: RouteRecordRaw[]
}
