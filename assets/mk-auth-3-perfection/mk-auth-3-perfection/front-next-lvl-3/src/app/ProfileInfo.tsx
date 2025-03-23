'use client'

import { PUBLIC_PAGES } from '@/config/pages/public.config'
import authService from '@/services/auth/auth.service'
import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useProfile } from './hooks/useProfile'

export function ProfileInfo() {
	const { push } = useRouter()

	const { user, isLoading } = useProfile()

	const [isPending, startTransition] = useTransition()

	const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			startTransition(() => {
				push(PUBLIC_PAGES.LOGIN)
			})
		}
	})

	const isLogoutLoading = isLogoutPending || isPending

	if (isLoading) return <div className="mt-10">Загружаю профиль...</div>

	return (
		<div className="mt-10">
			{user.avatarPath && (
				<Image
					src={user.avatarPath}
					alt="Avatar"
					width={70}
					height={70}
				/>
			)}
			<h2 className="text-2xl font-bold">Привет, {user.name || 'Аноним'}</h2>
			<br />
			<p className="text-lg">
				Ваш email: {user.email}{' '}
				<i>
					({user.verificationToken ? 'Требует подтверждения' : 'Подтверждена'})
				</i>
			</p>
			<br />
			<p>Права: {user.rights?.join(', ')}</p>
			<br />
			<button
				onClick={() => mutateLogout()}
				disabled={isLogoutLoading}
				className={cn('mt-2 bg-indigo-500 text-white px-4 py-2 rounded-md', {
					'bg-gray-500': isLogoutLoading
				})}
			>
				{isLogoutLoading ? 'Выходим...' : 'Выйти'}
			</button>
		</div>
	)
}
