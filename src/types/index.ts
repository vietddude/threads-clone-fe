import { InfinitePostResponse } from './api/post'
import { NotificationType, Privacy } from './enums'

export type User = {
	id: string
	username: string
	fullname: string | null
	verified: boolean | null
	image: string | null
	isAdmin: boolean | null
	link: string | null
	bio: string | null
	privacy: Privacy
	createdAt: Date
	updatedAt: Date
	email: string
}

export type Profile = User & {
	isFollowing: boolean
	followers: {
		id: string
		image: string
	}[]
	followerCount: number
}

export type Notification = {
	id: string
	createdAt: Date
	type: NotificationType
	message: string
	read: boolean
	notificationType: string
	post: string
	senderUser: Profile
}

export type Post = {
	id: string
	createdAt: Date
	text: string
	parentPostId: string | null
	author: {
		id: string
		image: string
		username: string
		fullname: string
		isAdmin: boolean
		isFollowing: boolean
	}
	count: {
		likeCount: number
		replyCount: number
	}
	liked: boolean
	reposted: boolean
	replies: {
		id: string
		image: string
		username: string
	}[]
	quoteId: string | null
	images: string[]
}

export type NestedPost = {
	id: string
	createdAt: Date
	text: string
	parentPostId: string | null
	author: {
		id: string
		image: string
		username: string
		fullname: string
		isAdmin: boolean
		isFollowing: boolean
	}
	count: {
		likeCount: number
		replyCount: number
	}
	liked: boolean
	reposted: boolean
	replies: Post[]
	quoteId: string | null
	images: string[]
}

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number]

export type PostCardProps = ArrayElement<InfinitePostResponse['data']>

export type AuthorInfoProps = PostCardProps['author']

export type PostReplyCardProps = {
	postInfo: NestedPost
	parentPosts: PostCardProps[]
}

export type UserCardProps = Profile

export type UserProfileInfoProps = Profile

export type ParentPostInfo = Pick<PostCardProps, 'id' | 'text' | 'images' | 'author'>

export type ParentPostsProps = {
	id: string
	createdAt: string
	text: string
	images: string[]
	likes: {
		userId: string
	}[]
	quoteId: string | null
	reposts: {
		userId: string
		postId: string
	}[]
	parentPostId: string | null
	replies: {
		author: {
			username: string
			id: string
			image: string
		}
	}[]
	author: {
		id: string
		image: string
		fullname: string
		username: string
		bio: string
		link: string
		createdAt: Date
		isAdmin: boolean
		followers: {
			id: string
			image: string
		}[]
	}
	like_count: number
	reply_count: number
}

export type TriggerVariant = 'create' | 'reply' | 'quote' | 'home'

export interface TriggerProps {
	variant: TriggerVariant
}

export interface ThreadInfo {
	id: string
	text: string
	image: string | undefined
	author: AuthorInfoProps
}
