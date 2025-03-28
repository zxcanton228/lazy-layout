import { globalState } from '../../store'
import logger from '../../utils/logger/logger'
import terminal from '../terminal/terminal'
import { EnumPackageManager } from './../../types/types'
import fileService from './file.service'

interface IDeps {
	dep: string[]
	devDep: string[]
}

class NodeModulesService {
	public async install(assetsFilePath?: string): Promise<void> {
		const { packageManager, projectName } = globalState
		logger.system('Installing dependencies...')
		try {
			await terminal(
				` ${
					packageManager === EnumPackageManager.yarn ? 'yarn' : packageManager
				}`,
				projectName
			)
			if (assetsFilePath) this.add(assetsFilePath)
		} catch (error) {
			throw new Error(error)
		}
	}

	public async add(filePath: string): Promise<void> {
		// const packageManager = getState(s => s.packageManager)
		const dependsData: IDeps = await fileService.read<IDeps>(filePath)
		const { packageManager, programPath, projectName } = globalState
		const devDepends = dependsData.devDep.join(' ')
		const depends = dependsData.dep.join(' ')

		console.log(`${programPath}/${packageManager}.install-deps.bat ${depends}`)

		Promise.all([
			terminal(
				`cd ${programPath} && ${packageManager} add ${depends} --modules-folder node_modules`
			),
			terminal(
				`cd ${programPath} && ${packageManager} add -D ${devDepends} --modules-folder node_modules`
			),
		]).then(() => logger.success('Deps installed!'))
	}
}
export default new NodeModulesService()
