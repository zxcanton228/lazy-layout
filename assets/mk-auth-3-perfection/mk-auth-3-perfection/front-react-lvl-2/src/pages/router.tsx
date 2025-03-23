import { ADMIN_PAGES } from '@/config/pages/admin.config'
import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { UserRole } from '@/services/auth/auth.types'
import { createBrowserRouter } from 'react-router-dom'
import { AdminPage } from './admin/Admin'
import { LoginPage } from './auth/login/Login'
import RegisterPage from './auth/register/Register'
import { SocialAuthPage } from './auth/social-auth/SocialAuth'
import { DashboardPage } from './dashboard/Dashboard'
import { HomePage } from './home/Home'
import { ManagerPage } from './manager/Manger'
import { PlansPage } from './plans/Plans'
import { ProtectedRoutes } from './ProtectedRoutes'
import { RedirectIfAuth } from './RedirectIfAuth'

export const router = createBrowserRouter([
	{
		element: <RedirectIfAuth />,
		children: [
			{
				path: PUBLIC_PAGES.LOGIN,
				element: <LoginPage />
			},
			{
				path: PUBLIC_PAGES.REGISTER,
				element: <RegisterPage />
			},
			{
				path: '/social-auth',
				element: <SocialAuthPage />
			}
		]
	},
	{
		element: <ProtectedRoutes />,
		children: [
			{
				path: '/',
				element: <HomePage />
			}
		]
	},
	{
		element: <ProtectedRoutes roles={UserRole.ADMIN} />,
		children: [
			{
				path: ADMIN_PAGES.HOME,
				element: <AdminPage />
			}
		]
	},
	{
		element: <ProtectedRoutes roles={UserRole.MANAGER} />,
		children: [
			{
				path: '/manager',
				element: <ManagerPage />
			}
		]
	},
	{
		element: <ProtectedRoutes roles={UserRole.PREMIUM} />,
		children: [
			{
				path: '/dashboard',
				element: <DashboardPage />
			}
		]
	},
	{
		path: PUBLIC_PAGES.PLANS,
		element: <PlansPage />
	},
	{
		path: '*',
		element: <div>404 not found!</div>
	}
])
