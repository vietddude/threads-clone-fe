import React from 'react'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import useFileStore from '@/store/fileStore'
import usePost from '@/store/post'
import PostPrivacyMenu from '@/components/menus/post-privacy-menu'
import CreatePostInput from '@/components/create-post-input'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { Check } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import useDialog from '@/store/dialog'
import CreateButton from '@/components/buttons/create-button'
import { useMutation } from '@tanstack/react-query'
import { CreatePostRequest, ReplyToPostRequest } from '@/types/api/post'
import { post } from '@/api'
import { ApiError } from '@/types/api/common'
import { queryClient } from '@/routes/__root'
import { uploadMultipleImages } from '@/api/upload-image'
import _ from 'lodash'

const CreatePostCard: React.FC = () => {
	const navigate = useNavigate()
	const path = useLocation().pathname

	const { openDialog, setOpenDialog, replyPostInfo, setReplyPostInfo, quoteInfo, setQuoteInfo } = useDialog()
	const { selectedFile, setSelectedFile, isSelectedImageSafe } = useFileStore()
	const { postPrivacy } = usePost()

	// Local state for thread data
	const [threadData, setThreadData] = React.useState({
		privacy: postPrivacy,
		text: ''
	})

	// Update threadData privacy only when postPrivacy changes
	React.useEffect(() => {
		setThreadData((prevThreadData) =>
			prevThreadData.privacy !== postPrivacy ? { ...prevThreadData, privacy: postPrivacy } : prevThreadData
		)
	}, [postPrivacy])

	// Handle input changes with debounce
	const handleFieldChange = React.useCallback(
		_.debounce((textValue: string) => {
			setThreadData((prev) => (prev.text !== textValue ? { ...prev, text: textValue } : prev))
		}, 300), // 300ms debounce
		[]
	)

	// Mutation for creating a thread
	const { isPending, mutateAsync: createThread } = useMutation({
		mutationFn: (data: CreatePostRequest) => post.createPost(data),
		onMutate: () => {
			setThreadData({ ...threadData, text: '' }) // Reset text optimistically
		},
		onError: () => {
			toast.error('PostingError: Something went wrong!')
		},
		onSettled: async () => {
			console.log('createThread onSettled', path)
			if (path === '/') await queryClient.invalidateQueries({ queryKey: ['posts'] })
		},
		retry: false
	})

	// Mutation for replying to a post
	const { isPending: isReplying, mutateAsync: replyToPost } = useMutation({
		mutationFn: (data: ReplyToPostRequest) => post.replyToPost(data),
		onError: (err: ApiError) => {
			toast.error('ReplyingError: Something went wrong!')
			if (err.code === 'UNAUTHORIZED') {
				navigate({ to: '/login' })
			}
		},
		onSettled: async () => {
			console.log('replyToPost onSettled', path)
			if (path === '/') await queryClient.invalidateQueries({ queryKey: ['posts'] })
		},
		retry: false
	})

	// Handle post creation or reply
	async function handleMutation() {
		const checkUploadedImage = selectedFile[0]

		if (checkUploadedImage && !isSelectedImageSafe) {
			toast.error('Your post is not work-safe. Please revise it.')
			return
		}

		const imageUrls = await uploadMultipleImages(selectedFile)

		const promise = replyPostInfo
			? replyToPost({
					text: threadData.text,
					postId: replyPostInfo.id,
					images: imageUrls ?? undefined,
					privacy: threadData.privacy,
					postAuthor: replyPostInfo.author.id
				})
			: createThread({
					text: threadData.text,
					images: imageUrls ?? undefined,
					privacy: threadData.privacy,
					quoteId: quoteInfo?.id,
					postAuthor: quoteInfo?.author.id
				})

		return promise
	}

	// Handle create thread button click
	function handleCreateThread() {
		setOpenDialog(false)
		const promise = handleMutation()

		toast.promise(promise, {
			loading: (
				<div className='flex w-[270px] items-center justify-start gap-1.5 p-0'>
					<div>
						<Icons.loading className='h-8 w-8 ' />
					</div>
					Posting...
				</div>
			),
			success: (data) => (
				<div className='flex w-[270px] items-center justify-between p-0 '>
					<div className='flex items-center justify-center gap-1.5'>
						<Check className='h-5 w-5 ' />
						Posted
					</div>
					<Link href={`/${data?.author.username}/post/${data?.postId}`} className='hover:text-blue-900'>
						View
					</Link>
				</div>
			),
			error: (error) => `Error ${error}`
		})
	}

	// Reset state when dialog closes
	React.useEffect(() => {
		if (!openDialog) {
			setThreadData({ privacy: postPrivacy, text: '' })
			setSelectedFile([])
			setReplyPostInfo(null)
			setQuoteInfo(null)
		}
	}, [openDialog, postPrivacy, setQuoteInfo, setReplyPostInfo, setSelectedFile])

	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog}>
			<DialogTrigger>
				<CreateButton />
			</DialogTrigger>
			<DialogContent className='w-full max-w-lg select-none border-none bg-transparent shadow-none outline-none sm:max-w-[668px]'>
				<h1 className='mb-2 w-full text-center font-bold text-white'>
					{replyPostInfo ? 'Reply' : 'New thread'}
				</h1>
				<Card className='rounded-2xl border-none bg-background shadow-2xl ring-1 ring-[#393939] ring-offset-0 dark:bg-[#181818]'>
					<div className='no-scrollbar max-h-[70vh] overflow-y-auto p-6'>
						{replyPostInfo && (
							<CreatePostInput
								isOpen={openDialog}
								onTextareaChange={handleFieldChange}
								replyThreadInfo={replyPostInfo}
							/>
						)}
						<CreatePostInput
							isOpen={openDialog}
							onTextareaChange={handleFieldChange}
							quoteInfo={quoteInfo}
						/>
					</div>
					<div className='flex w-full items-center justify-between p-6'>
						<PostPrivacyMenu />
						<Button
							size='sm'
							onClick={handleCreateThread}
							disabled={!isSelectedImageSafe || threadData.text === '' || isPending || isReplying}
							className='select-none rounded-full bg-foreground px-4 font-semibold text-white hover:bg-foreground dark:text-black'
						>
							{(isPending || isReplying) && (
								<Icons.spinner className='mr-2 h-4 w-4 animate-spin' aria-hidden='true' />
							)}
							Post
							<span className='sr-only'>Post</span>
						</Button>
					</div>
				</Card>
			</DialogContent>
		</Dialog>
	)
}

export default CreatePostCard
