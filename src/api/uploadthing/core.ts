import useUser from '@/store/user'
import { createUploadthing, type FileRouter } from 'uploadthing/server'

const f = createUploadthing()

const auth = (_req: Request) => {
	const user = useUser.getState().user
	if (!user) throw new Error('Unauthorized')
	return { userId: user.id }
}

export const uploadRouter = {
	// Takes up to 4 2mb images, and the client will not resolve
	// the upload until the `onUploadComplete` resolved.
	withAwaitedServerData: f(
		{ image: { maxFileSize: '2MB', maxFileCount: 4 }, video: { maxFileSize: '256MB', maxFileCount: 1 } },
		{ awaitServerData: true }
	)
		.middleware(({ req }) => auth(req))
		.onUploadComplete((data) => {
			console.log('data', data)
			return { foo: 'bar' as const }
		})
} satisfies FileRouter

export type UploadRouter = typeof uploadRouter
