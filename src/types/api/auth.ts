import { User } from '@/types'
import { Privacy } from '../enums'

export interface LoginRequest {
	identifier: string
	password: string
}

export interface LoginResponse {
	user: User
	token: string
}

export interface SetupRequest {
	bio: string
	link: string
	privacy: Privacy
}

export interface SetupResponse {
	user: User
}

export interface SSOCallbackResponse {
	accessToken: string
	user: User
}
