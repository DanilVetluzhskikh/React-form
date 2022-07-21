import { FC } from 'react'
import {
  Create,
  Main
} from '@pages/index'

export type NavigationRoute = {
    path: string;
    component: FC,
}

export const navigationRoutes:NavigationRoute[] = [
  {
    path: '/',
    component: Main
  }
]

export const navigationSecureRoutes: NavigationRoute[] = [
  {
    path: '/create',
    component: Create
  }
]
