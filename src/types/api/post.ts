import { NestedPost, Post, User } from '@/types'
import { PostPrivacy } from '@/types/enums'
import { PaginationResponse } from './common'

export type InfinitePostResponse = PaginationResponse & {
	data: Post[]
}

export type CreatePostRequest = {
	text: string
	images?: string[]
	privacy: PostPrivacy
	quoteId?: string
	postAuthor?: string
}

export type CreatePostResponse = {
	postId: string
	author: User
}

export type PostResponse = Post

export type ReplyToPostRequest = {
	postAuthor: string
	postId: string
	text: string
	images?: string[]
	privacy: PostPrivacy
}

export type ReplyToPostResponse = {
	postId: string
	author: User
}

export type LikeResponse = {
	postId: string
	liked: boolean
}

export type RepostResponse = {
	postId: string
	reposted: boolean
}

export type PostLikeInfoResponse = {
	likeCount: number
	repostCount: number
	likes: {
		id: string
		username: string
		fullname: string
		image: string
		isAdmin: boolean
		isFollowing: boolean
	}[]
}

export type NestedPostResponse = {
	postInfo: NestedPost
	parentPosts: Post[]
}
