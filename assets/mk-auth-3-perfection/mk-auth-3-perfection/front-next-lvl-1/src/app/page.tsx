import { ProfileInfo } from '@/app/ProfileInfo'

async function HomePage() {
	return (
		<div>
			<h1 className="mt-4">Home Page</h1>

			<ProfileInfo />
		</div>
	)
}

export default HomePage
