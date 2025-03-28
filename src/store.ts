import appRootPath from 'app-root-path'
import inquirer from 'inquirer'
import { FileService } from './core/services/file.service'
import {
	EnumAuthorizationType,
	EnumLayoutType,
	EnumPackageManager,
} from './types/enums'

import { IState } from './types/types'
import enumMethod from './utils/enum-method.util'
import isDev from './utils/env/is-dev'
import jwtSecretConfigure from './utils/env/jwt-secret.configure'
export const globalState: IState = {
	projectName: 'test-project',
	packageManager: EnumPackageManager.yarn,

	programPath: isDev ? appRootPath.path : process.argv.slice(2)[0],
	assetsPath: appRootPath.path + '/assets',

	layoutType: EnumLayoutType.backend,
	isDocker: false,

	authorizationType: EnumAuthorizationType.default,
	jwtSecret: '',
}

export async function getGlobalEnvironment(): Promise<boolean> {
	const pathToHistory: string =
		appRootPath.path + '/src/history/history-of-choice.json'
	const fileService = new FileService(
		globalState.programPath,
		globalState.assetsPath
	)
	const defaultSettings = fileService.read<IState>(pathToHistory)

	const {
		layoutType,
		pm,
		authorizationType,
		projectName: pn,
		isDocker,
	} = await inquirer.prompt([
		{
			type: 'input',
			name: 'projectName',
			message: 'What do you call the project? 🪪',
			default: defaultSettings.projectName,
		},
		{
			type: 'list',
			name: 'layoutType',
			message: 'What do you want to prepare? 🧱',
			choices: enumMethod(EnumLayoutType),
			default: defaultSettings.layoutType,
		},
		{
			type: 'list',
			name: 'pm',
			message: 'Which package manager would you to use? 📂',
			choices: enumMethod(EnumPackageManager),
			default: defaultSettings.packageManager,
		},
		{
			type: 'list',
			name: 'authorizationType',
			message: 'What type of authorization do you want to use? 🔑',
			// choices: ['🔓None', '🔒Default', '🔐Perfect'],
			choices: enumMethod(EnumAuthorizationType),
			default: defaultSettings.authorizationType,
		},
		{
			type: 'confirm',
			name: 'isDocker',
			message: 'Do you want to use docker? 🐳',

			default: defaultSettings.isDocker,
		},
	])

	const projectName = pn.replace(/ /g, '-').toLowerCase()

	fileService.editFile(
		pathToHistory,
		JSON.stringify({
			packageManager: pm,
			layoutType,
			authorizationType,
			projectName,
			isDocker,
		})
	)

	Object.assign(globalState, {
		packageManager: pm,
		layoutType: layoutType,
		authorizationType: authorizationType,
		projectName,
		programPath: appRootPath.path + `/${projectName}`,
		jwtSecret: jwtSecretConfigure(projectName),
		isDocker,
	})

	return true
}
