const lengthOfJwtSecret: number = 30
const insertProjectName = (jwtKeyOrig: string, projectName: string): string => {
	const jwtKey = jwtKeyOrig.slice(0, projectName.length * -1)
	const position = Math.floor(Math.random() * (lengthOfJwtSecret - 1) + 1)

	const insertWord = projectName.toUpperCase()

	const output = [
		jwtKey.slice(0, position),
		insertWord,
		jwtKey.slice(position),
	].join('')
	return output
}

const jwtSecretConfigure = (projectName: string): string => {
	let result: string = ''
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+;:.>,<?/|}]{[]}'
	for (let i: number = 0; i < lengthOfJwtSecret; i++) {
		result += characters.charAt(Math.floor(Math.random() * characters.length))
	}
	const key = insertProjectName(result, projectName)
	return key
}

export default jwtSecretConfigure
