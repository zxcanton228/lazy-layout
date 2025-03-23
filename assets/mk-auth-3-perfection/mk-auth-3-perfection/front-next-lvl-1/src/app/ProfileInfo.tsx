'use client'

import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { removeFromStorage } from '@/services/auth/auth.helper'
import cn from 'clsx'
import { useRouter } from 'next/navigation'
import { useProfile } from './hooks/useProfile'

export function ProfileInfo() {
	const { push } = useRouter()

	const { user, isLoading } = useProfile()

	if (isLoading) return <div className="mt-10">Загружаю профиль...</div>

	return (
		<div className="mt-10">
			<h2 className="text-2xl font-bold">Привет, {user.name || 'Аноним'}</h2>
			<br />
			<p className="text-lg">Ваш email: {user.email} </p>
			<br />
			<p>Права: {user.rights?.join(', ')}</p>
			<br />
			<button
				onClick={() => {
					push(PUBLIC_PAGES.LOGIN)
					removeFromStorage()
				}}
				className={cn('mt-2 bg-indigo-500 text-white px-4 py-2 rounded-md')}
			>
				Выйти
			</button>
		</div>
	)
}
