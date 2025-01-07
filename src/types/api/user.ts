import { Profile } from '..'
import { PaginationResponse } from './common'

export type FollowResponse = {
	userId: string
	followed: boolean
}

export type InfiniteUserResponse = PaginationResponse & {
	data: Profile[]
}
