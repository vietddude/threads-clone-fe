import { apiClient } from './api-client'
import { LoginRequest, LoginResponse, SetupRequest, SetupResponse, SSOCallbackResponse } from '@/types/api/auth'
import { SSOCallbackSearch } from '@/routes/(auth)/_auth.sso-callback'
export const auth = {
	login: (credentials: LoginRequest): Promise<LoginResponse> => apiClient.post('/auth/login', credentials),
	setup: (data: SetupRequest): Promise<SetupResponse> => apiClient.put('/auth/setup', data),
	callback: (data: SSOCallbackSearch): Promise<SSOCallbackResponse> => apiClient.post('/auth/google/callback', data)
}
