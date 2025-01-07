import { ApiError } from '@/types/api/common'
import axios from 'axios'
import { API_URL } from '@/lib/config'
import useToken from '@/store/token'

// Tạo instance của axios
export const apiClient = axios.create({
	baseURL: API_URL,
	withCredentials: true // Đảm bảo cookie được gửi đi kèm với request
})

// Interceptor để thêm token vào headers từ cookie
apiClient.interceptors.request.use(
	(config) => {
		// Lấy token từ cookie
		const accessToken = useToken.getState().accessToken
		console.log('accessToken', accessToken)
		if (accessToken) {
			// Nếu token tồn tại thì thêm vào header Authorization
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	(error) => {
		// Xử lý lỗi khi gọi API trước khi request được gửi đi
		return Promise.reject(error)
	}
)

// Interceptor để xử lý phản hồi API và lấy data
apiClient.interceptors.response.use(
	(response) => {
		// Trả về dữ liệu nếu response thành công
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
