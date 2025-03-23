import { axiosClassic } from '@/api/axios'
import { IFormData, IUser } from '@/types/types'
import { saveTokenStorage } from './auth.helper'

interface IAuthResponse {
	accessToken: string
	user: IUser
}

class AuthService {
	async main(
		type: 'login' | 'register',
		data: IFormData,
		token?: string | null
	) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data,
			{
				headers: {
					recaptcha: token
				}
			}
		)

		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	}
}

export default new AuthService()
