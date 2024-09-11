declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  // biome-ignore lint/complexity/noBannedTypes: reason
  const component: DefineComponent<unknown, unknown, any>
  export default component
}

declare module '#router' {
  import type { Router } from 'vue-router'

  const router: Router
}
