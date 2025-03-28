import {
	EnumAuthorizationType,
	EnumLayoutType,
	EnumPackageManager,
} from './enums'

export interface IState {
	projectName: string
	packageManager: EnumPackageManager
	programPath: string
	assetsPath: string
	layoutType: EnumLayoutType
	authorizationType: EnumAuthorizationType
	isDocker: boolean
	jwtSecret: string
}
