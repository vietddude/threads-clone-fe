import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TokenState {
	accessToken: string
	setAccessToken: (accessToken: string) => void
}

const useToken = create<TokenState>()(
	persist(
		(set) => ({
			accessToken: '',
			setAccessToken: (accessToken) => set({ accessToken })
		}),
		{
			name: 'token-storage' // storage key
		}
	)
)

export default useToken
