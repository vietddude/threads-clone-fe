export type PaginationResponse = {
	currentPage: number
	pageSize: number
	totalItems: number
}

export interface ApiError {
	message: string
	code?: string
}
