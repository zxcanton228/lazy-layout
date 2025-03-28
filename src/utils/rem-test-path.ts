import appRootPath from 'app-root-path'
import { access } from 'fs-extra'
import fileService from '../core/services/file.service'

const testPath = appRootPath + '/test-project'

export default async function remDir(): Promise<boolean> {
	try {
		await access(testPath)
		fileService.delete(testPath)
		return true
	} catch {
		return true
	}
}
