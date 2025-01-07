import { Notification } from '@/types'
import { PaginationResponse } from './common'

export type NotificationResponse = PaginationResponse & {
	data: Notification[]
}
