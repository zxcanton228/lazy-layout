import { getServerAuth } from '@/utils/server/get-server-auth'
import { notFound } from 'next/navigation'

import type { PropsWithChildren } from 'react'

export default async function AdminLayout({ children }: PropsWithChildren) {
	const user = await getServerAuth()

	if (!user?.isAdmin) return notFound()

	return children
}
