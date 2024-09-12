import type { NavigationGuard, RouteLocationNormalized, RouteLocationRaw } from 'vue-router'
import { useNuxlite } from './nuxlite'

interface NavigateToOptions {
  replace?: boolean
}

export interface RouteMiddleware {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): ReturnType<NavigationGuard>
}

export function navigateTo(to: RouteLocationRaw | undefined | null, options?: NavigateToOptions) {
  if (!to)
    to = '/'

  const nuxlite = useNuxlite()

  if (nuxlite.processingMiddleware.value)
    return to

  const router = useRouter()
  return options?.replace ? router.replace(to) : router.push(to)
}

export function defineNuxtRouteMiddleware(middleware: RouteMiddleware) {
  return middleware
}
