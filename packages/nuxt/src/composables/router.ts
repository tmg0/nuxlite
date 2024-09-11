import type { NavigationGuard, RouteLocationNormalized, RouteLocationRaw } from 'vue-router'

interface NavigateToOptions {
  replace?: boolean
}

export interface RouteMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}

export function navigateTo(to: RouteLocationRaw | undefined | null, options?: NavigateToOptions) {
  if (!to)
    to = '/'

  const router = useRouter()
  return options?.replace ? router.replace(to) : router.push(to)
}

export function defineNuxtRouteMiddleware(middleware: RouteMiddleware) {
  return middleware
}
