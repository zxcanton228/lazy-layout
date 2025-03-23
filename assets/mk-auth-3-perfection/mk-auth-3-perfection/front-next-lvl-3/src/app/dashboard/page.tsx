import { PremiumContent } from '@/app/dashboard/PremiumContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Dashboard'
}

export default function DashboardPage() {
	return <PremiumContent />
}
