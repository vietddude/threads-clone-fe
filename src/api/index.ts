import { apiClient } from './api-client'
import { LoginRequest, LoginResponse, SetupRequest, SetupResponse, SSOCallbackResponse } from '@/types/api/auth'
import { SSOCallbackSearch } from '@/routes/_auth/sso-callback'
import { Profile } from '@/types'
import { FollowResponse } from '@/types/api/user'
import { NotificationResponse } from '@/types/api/notification'
import {
	CreatePostRequest,
	CreatePostResponse,
	InfinitePostResponse,
	ReplyToPostRequest,
	ReplyToPostResponse
} from '@/types/api/post'

export const auth = {
	login: (credentials: LoginRequest): Promise<LoginResponse> => apiClient.post('/auth/login', credentials),
	setup: (data: SetupRequest): Promise<SetupResponse> => apiClient.put('/auth/setup', data),
	callback: (data: SSOCallbackSearch): Promise<SSOCallbackResponse> => apiClient.post('/auth/google/callback', data)
}

export const user = {
	getProfile: (username: string): Promise<Profile> => apiClient.get(`/users/${username}`),
	toggleFollow: (username: string): Promise<FollowResponse> => apiClient.post(`/users/${username}/follow`)
}

export const notification = {
	getNotifications: (): Promise<NotificationResponse> => apiClient.get('/notifications')
}

export const post = {
	getInfinitePosts: (
		query: string,
		author: string,
		type: string,
		page: number,
		limit: number
	): Promise<InfinitePostResponse> => apiClient.get('/posts', { params: { query, author, type, page, limit } }),
	createPost: (data: CreatePostRequest): Promise<CreatePostResponse> => apiClient.post('/posts', data),
	replyToPost: (data: ReplyToPostRequest): Promise<ReplyToPostResponse> => apiClient.post('/posts/reply', data),
	deletePost: (id: string): Promise<void> => apiClient.delete(`/posts/${id}`)
}
