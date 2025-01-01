import { create } from 'zustand'
import { User } from '@/types'

interface UserStore {
	user: User | null
	setUser: (user: User) => void
	clearUser: () => void
}

const useUser = create<UserStore>()((set) => ({
	user: null,
	setUser: (user: User) => set({ user }),
	clearUser: () => set({ user: null })
}))

export default useUser
