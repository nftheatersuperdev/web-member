import { lazy } from 'react'
import { LayoutRouteProps } from './layout/LayoutRoute'

export const ROUTE_PATHS = Object.freeze({
  ROOT: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  FORBIDDEN: '/403',
  NOT_FOUND: '/404',
  PROFILE: '/profile',
})

export const routes: Readonly<LayoutRouteProps[]> = Object.freeze([
  {
    path: ROUTE_PATHS.LOGIN,
    isPublic: true,
    component: lazy(() => import('./pages/Login' /* webpackChunkName: "app" */)),
  },
  {
    path: ROUTE_PATHS.LOGOUT,
    isPublic: true,
    component: lazy(() => import('./pages/Logout' /* webpackChunkName: "app" */)),
  },
  {
    path: ROUTE_PATHS.NOT_FOUND,
    isPublic: true,
    component: lazy(() => import('./pages/Error/NotFound' /* webpackChunkName: "app" */)),
  },
  {
    path: ROUTE_PATHS.PROFILE,
    component: lazy(() => import('./pages/Profile' /* webpackChunkName: "app" */)),
  },
  {
    path: ROUTE_PATHS.ROOT,
    component: lazy(() => import('./pages/Profile' /* webpackChunkName: "app" */)),
  },
])
