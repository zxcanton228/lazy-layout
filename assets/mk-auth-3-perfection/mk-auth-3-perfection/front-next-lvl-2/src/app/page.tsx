import { ProfileInfo } from '@/app/ProfileInfo'
import { getServerAuth } from '@/utils/server/get-server-auth'
import { notFound } from 'next/navigation'

async function HomePage() {
	const user = await getServerAuth()

	if (!user?.isLoggedIn) return notFound()

	return (
		<div>
			<h1 className="mt-4">Home Page</h1>
			<p>(only for loggedIn user)</p>
			<br />
			<p>Для проверки прав, есть страница: /admin</p>

			<ProfileInfo />
		</div>
	)
}

export default HomePage
