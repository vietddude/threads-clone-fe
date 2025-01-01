import { auth } from '@/api'
import { LoginResponse } from '@/types/api/auth'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'

// Custom hook sử dụng TanStack Query với Axios
export function useLogin() {
	const mutation = useMutation<LoginResponse, Error, { identifier: string; password: string }>({
		mutationFn: auth.login,
		onSuccess: (data) => {
			if (data.token) {
				Cookies.set('authToken', data.token)
			}
		}
	})

	return mutation
}
