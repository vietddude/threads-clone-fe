/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as NotFoundImport } from './routes/not-found'
import { Route as ErrorImport } from './routes/error'
import { Route as HomeImport } from './routes/_home'
import { Route as AuthImport } from './routes/_auth'
import { Route as HomeIndexImport } from './routes/_home/index'
import { Route as HomeSearchImport } from './routes/_home/search'
import { Route as HomeActivityImport } from './routes/_home/activity'
import { Route as HomeUsernameImport } from './routes/_home/$username'
import { Route as AuthSsoCallbackImport } from './routes/_auth/sso-callback'
import { Route as AuthSetupImport } from './routes/_auth/setup'
import { Route as AuthLoginImport } from './routes/_auth/login'
import { Route as HomeUsernameIndexImport } from './routes/_home/$username/index'
import { Route as HomeUsernamePostImport } from './routes/_home/$username_/post'
import { Route as HomeUsernameRepostsImport } from './routes/_home/$username/reposts'
import { Route as HomeUsernameRepliesImport } from './routes/_home/$username/replies'
import { Route as HomeUsernamePostPostIdImport } from './routes/_home/$username_/post/$postId'

// Create/Update Routes

const NotFoundRoute = NotFoundImport.update({
  id: '/not-found',
  path: '/not-found',
  getParentRoute: () => rootRoute,
} as any)

const ErrorRoute = ErrorImport.update({
  id: '/error',
  path: '/error',
  getParentRoute: () => rootRoute,
} as any)

const HomeRoute = HomeImport.update({
  id: '/_home',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const HomeIndexRoute = HomeIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => HomeRoute,
} as any)

const HomeSearchRoute = HomeSearchImport.update({
  id: '/search',
  path: '/search',
  getParentRoute: () => HomeRoute,
} as any)

const HomeActivityRoute = HomeActivityImport.update({
  id: '/activity',
  path: '/activity',
  getParentRoute: () => HomeRoute,
} as any)

const HomeUsernameRoute = HomeUsernameImport.update({
  id: '/$username',
  path: '/$username',
  getParentRoute: () => HomeRoute,
} as any)

const AuthSsoCallbackRoute = AuthSsoCallbackImport.update({
  id: '/sso-callback',
  path: '/sso-callback',
  getParentRoute: () => AuthRoute,
} as any)

const AuthSetupRoute = AuthSetupImport.update({
  id: '/setup',
  path: '/setup',
  getParentRoute: () => AuthRoute,
} as any)

const AuthLoginRoute = AuthLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => AuthRoute,
} as any)

const HomeUsernameIndexRoute = HomeUsernameIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => HomeUsernameRoute,
} as any)

const HomeUsernamePostRoute = HomeUsernamePostImport.update({
  id: '/$username_/post',
  path: '/$username/post',
  getParentRoute: () => HomeRoute,
} as any)

const HomeUsernameRepostsRoute = HomeUsernameRepostsImport.update({
  id: '/reposts',
  path: '/reposts',
  getParentRoute: () => HomeUsernameRoute,
} as any)

const HomeUsernameRepliesRoute = HomeUsernameRepliesImport.update({
  id: '/replies',
  path: '/replies',
  getParentRoute: () => HomeUsernameRoute,
} as any)

const HomeUsernamePostPostIdRoute = HomeUsernamePostPostIdImport.update({
  id: '/$postId',
  path: '/$postId',
  getParentRoute: () => HomeUsernamePostRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_home': {
      id: '/_home'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof HomeImport
      parentRoute: typeof rootRoute
    }
    '/error': {
      id: '/error'
      path: '/error'
      fullPath: '/error'
      preLoaderRoute: typeof ErrorImport
      parentRoute: typeof rootRoute
    }
    '/not-found': {
      id: '/not-found'
      path: '/not-found'
      fullPath: '/not-found'
      preLoaderRoute: typeof NotFoundImport
      parentRoute: typeof rootRoute
    }
    '/_auth/login': {
      id: '/_auth/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof AuthLoginImport
      parentRoute: typeof AuthImport
    }
    '/_auth/setup': {
      id: '/_auth/setup'
      path: '/setup'
      fullPath: '/setup'
      preLoaderRoute: typeof AuthSetupImport
      parentRoute: typeof AuthImport
    }
    '/_auth/sso-callback': {
      id: '/_auth/sso-callback'
      path: '/sso-callback'
      fullPath: '/sso-callback'
      preLoaderRoute: typeof AuthSsoCallbackImport
      parentRoute: typeof AuthImport
    }
    '/_home/$username': {
      id: '/_home/$username'
      path: '/$username'
      fullPath: '/$username'
      preLoaderRoute: typeof HomeUsernameImport
      parentRoute: typeof HomeImport
    }
    '/_home/activity': {
      id: '/_home/activity'
      path: '/activity'
      fullPath: '/activity'
      preLoaderRoute: typeof HomeActivityImport
      parentRoute: typeof HomeImport
    }
    '/_home/search': {
      id: '/_home/search'
      path: '/search'
      fullPath: '/search'
      preLoaderRoute: typeof HomeSearchImport
      parentRoute: typeof HomeImport
    }
    '/_home/': {
      id: '/_home/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof HomeIndexImport
      parentRoute: typeof HomeImport
    }
    '/_home/$username/replies': {
      id: '/_home/$username/replies'
      path: '/replies'
      fullPath: '/$username/replies'
      preLoaderRoute: typeof HomeUsernameRepliesImport
      parentRoute: typeof HomeUsernameImport
    }
    '/_home/$username/reposts': {
      id: '/_home/$username/reposts'
      path: '/reposts'
      fullPath: '/$username/reposts'
      preLoaderRoute: typeof HomeUsernameRepostsImport
      parentRoute: typeof HomeUsernameImport
    }
    '/_home/$username_/post': {
      id: '/_home/$username_/post'
      path: '/$username/post'
      fullPath: '/$username/post'
      preLoaderRoute: typeof HomeUsernamePostImport
      parentRoute: typeof HomeImport
    }
    '/_home/$username/': {
      id: '/_home/$username/'
      path: '/'
      fullPath: '/$username/'
      preLoaderRoute: typeof HomeUsernameIndexImport
      parentRoute: typeof HomeUsernameImport
    }
    '/_home/$username_/post/$postId': {
      id: '/_home/$username_/post/$postId'
      path: '/$postId'
      fullPath: '/$username/post/$postId'
      preLoaderRoute: typeof HomeUsernamePostPostIdImport
      parentRoute: typeof HomeUsernamePostImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthLoginRoute: typeof AuthLoginRoute
  AuthSetupRoute: typeof AuthSetupRoute
  AuthSsoCallbackRoute: typeof AuthSsoCallbackRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthLoginRoute: AuthLoginRoute,
  AuthSetupRoute: AuthSetupRoute,
  AuthSsoCallbackRoute: AuthSsoCallbackRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface HomeUsernameRouteChildren {
  HomeUsernameRepliesRoute: typeof HomeUsernameRepliesRoute
  HomeUsernameRepostsRoute: typeof HomeUsernameRepostsRoute
  HomeUsernameIndexRoute: typeof HomeUsernameIndexRoute
}

const HomeUsernameRouteChildren: HomeUsernameRouteChildren = {
  HomeUsernameRepliesRoute: HomeUsernameRepliesRoute,
  HomeUsernameRepostsRoute: HomeUsernameRepostsRoute,
  HomeUsernameIndexRoute: HomeUsernameIndexRoute,
}

const HomeUsernameRouteWithChildren = HomeUsernameRoute._addFileChildren(
  HomeUsernameRouteChildren,
)

interface HomeUsernamePostRouteChildren {
  HomeUsernamePostPostIdRoute: typeof HomeUsernamePostPostIdRoute
}

const HomeUsernamePostRouteChildren: HomeUsernamePostRouteChildren = {
  HomeUsernamePostPostIdRoute: HomeUsernamePostPostIdRoute,
}

const HomeUsernamePostRouteWithChildren =
  HomeUsernamePostRoute._addFileChildren(HomeUsernamePostRouteChildren)

interface HomeRouteChildren {
  HomeUsernameRoute: typeof HomeUsernameRouteWithChildren
  HomeActivityRoute: typeof HomeActivityRoute
  HomeSearchRoute: typeof HomeSearchRoute
  HomeIndexRoute: typeof HomeIndexRoute
  HomeUsernamePostRoute: typeof HomeUsernamePostRouteWithChildren
}

const HomeRouteChildren: HomeRouteChildren = {
  HomeUsernameRoute: HomeUsernameRouteWithChildren,
  HomeActivityRoute: HomeActivityRoute,
  HomeSearchRoute: HomeSearchRoute,
  HomeIndexRoute: HomeIndexRoute,
  HomeUsernamePostRoute: HomeUsernamePostRouteWithChildren,
}

const HomeRouteWithChildren = HomeRoute._addFileChildren(HomeRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof HomeRouteWithChildren
  '/error': typeof ErrorRoute
  '/not-found': typeof NotFoundRoute
  '/login': typeof AuthLoginRoute
  '/setup': typeof AuthSetupRoute
  '/sso-callback': typeof AuthSsoCallbackRoute
  '/$username': typeof HomeUsernameRouteWithChildren
  '/activity': typeof HomeActivityRoute
  '/search': typeof HomeSearchRoute
  '/': typeof HomeIndexRoute
  '/$username/replies': typeof HomeUsernameRepliesRoute
  '/$username/reposts': typeof HomeUsernameRepostsRoute
  '/$username/post': typeof HomeUsernamePostRouteWithChildren
  '/$username/': typeof HomeUsernameIndexRoute
  '/$username/post/$postId': typeof HomeUsernamePostPostIdRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/error': typeof ErrorRoute
  '/not-found': typeof NotFoundRoute
  '/login': typeof AuthLoginRoute
  '/setup': typeof AuthSetupRoute
  '/sso-callback': typeof AuthSsoCallbackRoute
  '/activity': typeof HomeActivityRoute
  '/search': typeof HomeSearchRoute
  '/': typeof HomeIndexRoute
  '/$username/replies': typeof HomeUsernameRepliesRoute
  '/$username/reposts': typeof HomeUsernameRepostsRoute
  '/$username/post': typeof HomeUsernamePostRouteWithChildren
  '/$username': typeof HomeUsernameIndexRoute
  '/$username/post/$postId': typeof HomeUsernamePostPostIdRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_home': typeof HomeRouteWithChildren
  '/error': typeof ErrorRoute
  '/not-found': typeof NotFoundRoute
  '/_auth/login': typeof AuthLoginRoute
  '/_auth/setup': typeof AuthSetupRoute
  '/_auth/sso-callback': typeof AuthSsoCallbackRoute
  '/_home/$username': typeof HomeUsernameRouteWithChildren
  '/_home/activity': typeof HomeActivityRoute
  '/_home/search': typeof HomeSearchRoute
  '/_home/': typeof HomeIndexRoute
  '/_home/$username/replies': typeof HomeUsernameRepliesRoute
  '/_home/$username/reposts': typeof HomeUsernameRepostsRoute
  '/_home/$username_/post': typeof HomeUsernamePostRouteWithChildren
  '/_home/$username/': typeof HomeUsernameIndexRoute
  '/_home/$username_/post/$postId': typeof HomeUsernamePostPostIdRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/error'
    | '/not-found'
    | '/login'
    | '/setup'
    | '/sso-callback'
    | '/$username'
    | '/activity'
    | '/search'
    | '/'
    | '/$username/replies'
    | '/$username/reposts'
    | '/$username/post'
    | '/$username/'
    | '/$username/post/$postId'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/error'
    | '/not-found'
    | '/login'
    | '/setup'
    | '/sso-callback'
    | '/activity'
    | '/search'
    | '/'
    | '/$username/replies'
    | '/$username/reposts'
    | '/$username/post'
    | '/$username'
    | '/$username/post/$postId'
  id:
    | '__root__'
    | '/_auth'
    | '/_home'
    | '/error'
    | '/not-found'
    | '/_auth/login'
    | '/_auth/setup'
    | '/_auth/sso-callback'
    | '/_home/$username'
    | '/_home/activity'
    | '/_home/search'
    | '/_home/'
    | '/_home/$username/replies'
    | '/_home/$username/reposts'
    | '/_home/$username_/post'
    | '/_home/$username/'
    | '/_home/$username_/post/$postId'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  HomeRoute: typeof HomeRouteWithChildren
  ErrorRoute: typeof ErrorRoute
  NotFoundRoute: typeof NotFoundRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  HomeRoute: HomeRouteWithChildren,
  ErrorRoute: ErrorRoute,
  NotFoundRoute: NotFoundRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/_home",
        "/error",
        "/not-found"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/login",
        "/_auth/setup",
        "/_auth/sso-callback"
      ]
    },
    "/_home": {
      "filePath": "_home.tsx",
      "children": [
        "/_home/$username",
        "/_home/activity",
        "/_home/search",
        "/_home/",
        "/_home/$username_/post"
      ]
    },
    "/error": {
      "filePath": "error.tsx"
    },
    "/not-found": {
      "filePath": "not-found.tsx"
    },
    "/_auth/login": {
      "filePath": "_auth/login.tsx",
      "parent": "/_auth"
    },
    "/_auth/setup": {
      "filePath": "_auth/setup.tsx",
      "parent": "/_auth"
    },
    "/_auth/sso-callback": {
      "filePath": "_auth/sso-callback.tsx",
      "parent": "/_auth"
    },
    "/_home/$username": {
      "filePath": "_home/$username.tsx",
      "parent": "/_home",
      "children": [
        "/_home/$username/replies",
        "/_home/$username/reposts",
        "/_home/$username/"
      ]
    },
    "/_home/activity": {
      "filePath": "_home/activity.tsx",
      "parent": "/_home"
    },
    "/_home/search": {
      "filePath": "_home/search.tsx",
      "parent": "/_home"
    },
    "/_home/": {
      "filePath": "_home/index.tsx",
      "parent": "/_home"
    },
    "/_home/$username/replies": {
      "filePath": "_home/$username/replies.tsx",
      "parent": "/_home/$username"
    },
    "/_home/$username/reposts": {
      "filePath": "_home/$username/reposts.tsx",
      "parent": "/_home/$username"
    },
    "/_home/$username_/post": {
      "filePath": "_home/$username_/post.tsx",
      "parent": "/_home",
      "children": [
        "/_home/$username_/post/$postId"
      ]
    },
    "/_home/$username/": {
      "filePath": "_home/$username/index.tsx",
      "parent": "/_home/$username"
    },
    "/_home/$username_/post/$postId": {
      "filePath": "_home/$username_/post/$postId.tsx",
      "parent": "/_home/$username_/post"
    }
  }
}
ROUTE_MANIFEST_END */
