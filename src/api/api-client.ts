import { ApiError } from '@/types/api/common'
import axios from 'axios'
import { API_URL } from '@/lib/config'
import useToken from '@/store/token'

// Create an axios instance
export const apiClient = axios.create({
	baseURL: API_URL,
	withCredentials: true // Send cookies when calling API
})

// Interceptor handling request before sending
apiClient.interceptors.request.use(
	(config) => {
		// Get access token from store
		const accessToken = useToken.getState().accessToken
		if (accessToken) {
			// Add Authorization header to the request
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	(error) => {
		// Return error if request fails
		return Promise.reject(error)
	}
)

// Interceptor handling response before returning
apiClient.interceptors.response.use(
	(response) => {
		// Return data if response is successful
		return response.data
	},
	(error) => {
		const apiError = error.response?.data as ApiError
		if (apiError) {
			return Promise.reject(apiError)
		}
		return Promise.reject(error)
	}
)
