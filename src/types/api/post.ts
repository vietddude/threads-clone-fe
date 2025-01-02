import { Post } from '@/types'
import { PostPrivacy } from '../enums'

export type InfinitePostResponse = {
	data: Post[]
	page: number
	limit: number
	total: number
	hasMore: boolean
}

export type CreatePostRequest = {
	text: string
	images?: string[]
	privacy: PostPrivacy
	quoteId?: string
	postAuthor?: string
}

export type CreatePostResponse = {
	post: Post
}

export type ReplyToPostRequest = {
	postAuthor: string
	postId: string
	text: string
	images?: string[]
	privacy: PostPrivacy
}

export type ReplyToPostResponse = {
	post: Post
}
