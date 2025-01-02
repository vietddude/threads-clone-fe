import { Notification } from '@/types'

export type NotificationResponse = {
	data: Notification[]
	page: number
	limit: number
	total: number
}
