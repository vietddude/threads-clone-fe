import { InfinitePostResponse } from './api/post'
import { NotificationType, Privacy } from './enums'

export type User = {
	link: string | null
	id: string
	bio: string | null
	privacy: Privacy
	username: string
	verified: boolean | null
	createdAt: Date
	updatedAt: Date
	fullname: string | null
	image: string | null
	email: string
	isAdmin: boolean | null
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
	senderUser: User
}

export type Post = {
	id: string
	createdAt: Date
	text: string
	parentPostId: string | null
	author: Profile
	count: {
		likeCount: number
		replyCount: number
	}
	likes: {
		userId: string
	}[]
	replies: {
		author: {
			id: string
			image: string
			username: string
		}
	}[]
	quoteId: string | null
	images: string[]
	reposts: {
		userId: string
		postId: string
	}[]
}

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number]
// type RouterOutput = inferRouterOutputs<AppRouter>;

export type PostCardProps = ArrayElement<InfinitePostResponse['data']>

export type AuthorInfoProps = PostCardProps['author']

export type PostReplyCardProps = RouterOutput['post']['getNestedPosts']

export type UserCardProps = ArrayElement<RouterOutput['user']['allUsers']['allUsers']>

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
