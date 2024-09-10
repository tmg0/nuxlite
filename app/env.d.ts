declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  // biome-ignore lint/complexity/noBannedTypes: reason
  const component: DefineComponent<unknown, unknown, any>
  export default component
}

declare module 'vue-router/auto-routes' {
  import type { RouteRecordRaw } from 'vue-router'

  const routes: RouteRecordRaw[]
}
