import 'dotenv/config'
import { backend } from './backend/backend'
import { getGlobalEnvironment, globalState } from './store'
import { EnumLayoutType } from './types/enums'

async function bootstrap() {
	await getGlobalEnvironment()

	switch (globalState.layoutType) {
		case EnumLayoutType.backend:
			await backend()
			break
		case EnumLayoutType.frontend:
			await frontend()
			break

		default:
			break
	}
}

bootstrap()
	.catch(err => {
		console.error(err)
		process.exit(1)
	})
	.finally(() => {
		console.log('End down')
	})
