import { create } from 'zustand'
import { User } from '@/types'
import { persist } from 'zustand/middleware'

interface UserStore {
	user: User | null
	setUser: (user: User) => void
	clearUser: () => void
}

const useUser = create<UserStore>()(
	persist(
		(set) => ({
			user: null,
			setUser: (user: User) => set({ user }),
			clearUser: () => set({ user: null })
		}),
		{
			name: 'user-storage'
		}
	)
)

export default useUser
