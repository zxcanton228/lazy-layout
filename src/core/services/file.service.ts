import { copyFile, cp, readFileSync, rm, writeFile } from 'fs-extra'

export class FileService {
	constructor(
		private readonly programPath: string,
		private readonly assetsPath: string
	) {}
	public newFile(pathToNewFile: string) {
		console.log(pathToNewFile)
	}
	public read<T>(pathToFile: string): T {
		const fileWithDefaultSettings: T = JSON.parse(
			readFileSync(pathToFile, 'utf8')
		)
		return fileWithDefaultSettings
	}

	public delete(path: string | string[]) {
		if (typeof path === 'string') {
			rm(path, { recursive: true, force: true }, err => {
				if (!!err) throw err
			})
		} else {
			for (let i: number = 0; i < path.length; i++) {
				rm(path[i], { recursive: true, force: true }, err => {
					if (!!err) throw err
				})
			}
		}
	}
	public editFile(pathToFile: string, data: string) {
		writeFile(pathToFile, data, err => {
			if (err) throw err
		})
	}
	public copyFolderFromAssets(folder: string | string[]) {
		if (typeof folder === 'string') {
			cp(
				`${this.assetsPath}/${folder}`,
				`${this.programPath}/${folder}`,
				{ recursive: true, force: true },
				err => {
					if (!!err) throw err
				}
			)
		} else {
			for (let i: number = 0; i < folder.length; i++) {
				cp(
					`${this.assetsPath}/${folder[i]}`,
					`${this.programPath}/${folder[i]}`,
					{ recursive: true, force: true },
					err => {
						if (!!err) throw err
					}
				)
			}
		}
	}
	public copyFileFromAssets(file: string | string[]) {
		if (typeof file === 'string') {
			copyFile(
				`${this.assetsPath}/${file}`,
				`${this.programPath}/${file}`,
				err => {
					if (!!err) throw err
				}
			)
		} else {
			for (let i: number = 0; i < file.length; i++) {
				copyFile(
					`${this.assetsPath}/${file[i]}`,
					`${this.programPath}/${file[i]}`,
					err => {
						if (!!err) throw err
					}
				)
			}
		}
	}
}
