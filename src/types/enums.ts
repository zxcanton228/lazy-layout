export const EnumPackageManager = {
	pnpm: 'pnpm',
	npm: 'npm',
	bun: 'bun',
	yarn: 'yarn',
} as const
export type EnumPackageManager =
	(typeof EnumPackageManager)[keyof typeof EnumPackageManager]

export const EnumLayoutType = {
	frontend: 'frontend',
	backend: 'backend',
	all: 'all',
} as const
export type EnumLayoutType =
	(typeof EnumLayoutType)[keyof typeof EnumLayoutType]

export const EnumAuthorizationType = {
	none: 'none',
	junior: 'junior',
	default: 'default',
	perfect: 'perfect',
} as const
export type EnumAuthorizationType =
	(typeof EnumAuthorizationType)[keyof typeof EnumAuthorizationType]
