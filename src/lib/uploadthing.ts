import { generateReactHelpers } from '@uploadthing/react'
import type { FileRouter } from 'uploadthing/next'

export type OurFileRouter = {
	postImage: {
		image: {
			maxFileSize: '4MB'
			maxFileCount: 1
		}
	}
} & FileRouter

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>()
