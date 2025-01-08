import { apiClient } from './api-client'
import { LoginRequest, LoginResponse, SetupRequest, SetupResponse, SSOCallbackResponse } from '@/types/api/auth'
import { SSOCallbackSearch } from '@/routes/_auth/sso-callback'
import { Profile } from '@/types'
import { InfiniteUserResponse } from '@/types/api/user'
import { NotificationResponse } from '@/types/api/notification'
import {
	CreatePostRequest,
	CreatePostResponse,
	InfinitePostResponse,
	LikeResponse,
	NestedPostResponse,
	PostLikeInfoResponse,
	PostResponse,
	ReplyToPostRequest,
	ReplyToPostResponse,
	RepostResponse
} from '@/types/api/post'

export const auth = {
	login: (credentials: LoginRequest): Promise<LoginResponse> => apiClient.post('/auth/login', credentials),
	setup: (data: SetupRequest): Promise<SetupResponse> => apiClient.put('/auth/setup', data),
	callback: (data: SSOCallbackSearch): Promise<SSOCallbackResponse> => apiClient.post('/auth/google/callback', data)
}

export const user = {
	getProfile: (username: string): Promise<Profile> => apiClient.get(`/users/${username}`),
	toggleFollow: (username: string): Promise<null> => apiClient.post(`/users/${username}/follow`),
	infiniteUsers: ({ pageParam, query }: { pageParam: number; query?: string }): Promise<InfiniteUserResponse> =>
		apiClient.get('/users', { params: { page: pageParam, query } })
}

export const notification = {
	getNotifications: ({ pageParam }: { pageParam: number }): Promise<NotificationResponse> =>
		apiClient.get('/notifications', { params: { page: pageParam } })
}

export const post = {
	infinitePosts: ({
		pageParam,
		author,
		query
	}: {
		pageParam: number
		author?: string
		query?: string
	}): Promise<InfinitePostResponse> => apiClient.get('/posts', { params: { page: pageParam, author, query } }),
	replies: ({ pageParam, author }: { pageParam: number; author: string }): Promise<InfinitePostResponse> =>
		apiClient.get('/posts/replies', { params: { page: pageParam, author } }),
	reposts: ({ pageParam, author }: { pageParam: number; author: string }): Promise<InfinitePostResponse> =>
		apiClient.get('/posts/reposts', { params: { page: pageParam, author } }),
	getPost: (id: string): Promise<PostResponse> => apiClient.get(`/posts/${id}`),
	nestedPosts: (id: string): Promise<NestedPostResponse> => apiClient.get(`/posts/${id}/nested`),
	createPost: (data: CreatePostRequest): Promise<CreatePostResponse> => apiClient.post('/posts', data),
	replyToPost: (data: ReplyToPostRequest): Promise<ReplyToPostResponse> => apiClient.post('/posts/replies', data),
	deletePost: (id: string): Promise<void> => apiClient.delete(`/posts/${id}`),
	toggleLike: (id: string): Promise<LikeResponse> => apiClient.post(`/posts/${id}/like`),
	toggleRepost: (id: string): Promise<RepostResponse> => apiClient.post(`/posts/${id}/repost`),
	postLikeInfo: (id: string): Promise<PostLikeInfoResponse> => apiClient.get(`/posts/${id}/like-info`)
}
