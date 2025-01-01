import { create } from 'zustand'

interface TokenState {
	accessToken: string
	setAccessToken: (accessToken: string) => void
}

const useToken = create<TokenState>((set) => ({
	accessToken: '',
	setAccessToken: (accessToken) => set({ accessToken })
}))

export default useToken
