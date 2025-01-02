import FullscreenImageView from '@/components/fullscreen-image-view'
import Loading from '@/components/loading'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Suspense } from 'react'

export const queryClient = new QueryClient()

export const Route = createRootRoute({
	component: () => (
		<ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
			<QueryClientProvider client={queryClient}>
				<Outlet />
				<Toaster />
				<Suspense fallback={<Loading />}>
					<FullscreenImageView />
				</Suspense>
				<TanStackRouterDevtools />
			</QueryClientProvider>
		</ThemeProvider>
	)
})
