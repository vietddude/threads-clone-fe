import { auth } from '@/api'
import { LoginResponse } from '@/types/api/auth'
import { useMutation } from '@tanstack/react-query'

export function useLogin() {
	const mutation = useMutation<LoginResponse, Error, { identifier: string; password: string }>({
		mutationFn: auth.login,
		onSuccess: () => {}
	})

	return mutation
}
