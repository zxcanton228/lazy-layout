import { bgRedBright, white } from 'chalk'
import { exec } from 'child_process'
import isDev from '../../utils/env/is-dev'
/**
 * The usual use of the command in the terminal using exec
 * @param {string} command - The command
 * @param {string} openedFolderNow - The folder where the command will be executed
 */

const terminal = async (
	command: string,
	openedFolderNow?: string
): Promise<void> => {
	return new Promise((resolve, reject) => {
		exec(
			`${openedFolderNow ? `cd ${openedFolderNow} &&` : ''} ${command}`,
			async (error, stdout) => {
				if (error) {
					if (typeof error.message === 'string') {
						console.error(
							bgRedBright(white('🛑Terminal error: ' + error.message))
						)
					} else {
						console.error(error)
					}

					reject(error)
				} else {
					if (isDev) console.log(stdout)
					resolve()
				}
			}
		)
	})
}
export default terminal
