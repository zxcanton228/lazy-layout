const enumMethod = (enu: any): string[] => {
	const array: string[] = []
	for (let item in enu) {
		if (isNaN(Number(item))) {
			array.push(item)
		}
	}
	return array
}
export default enumMethod
