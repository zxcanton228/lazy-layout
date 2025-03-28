import terminal from 'src/core/terminal/terminal'
import { globalState } from 'src/store'
import { EnumAuthorizationType } from 'src/types/enums'

export async function backend() {
	const { packageManager, projectName, programPath, authorizationType } =
		globalState
	switch (authorizationType) {
		case EnumAuthorizationType.perfect:
			await terminal(`nest new ${projectName} -s -g -p ${packageManager}`, './')

			break
		case 'junior':
			break
		case 'default':
			break
		case 'perfect':
			break
		default:
			break
	}
}
