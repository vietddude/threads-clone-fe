import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_home/$username/')({
	component: RouteComponent
})

function RouteComponent() {
	return (
		<div>
			{/* {data ? (
      data?.length > 0 ? (
        data.map((post, index) => (
          <div key={post.id} className={cn({ 'mb-[10vh]': index == data.length - 1 })}>
            <PostCard {...post} />
            {index !== data.length - 1 && <Separator />}
          </div>
        ))
      ) : ( */}
			<div className='h-[50vh] w-full justify-center items-center flex text-[#777777]'>
				<p>No threads yet.</p>
			</div>
			{/* )
    ) : (
      <NotFound />
    )} */}
		</div>
	)
}
