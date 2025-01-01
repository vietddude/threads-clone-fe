import { CLIENT_ID, REDIRECT_URI } from '@/lib/config'

export const authenticateWithRedirect = () => {
	const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
	const options = {
		redirect_uri: REDIRECT_URI,
		client_id: CLIENT_ID,
		access_type: 'offline',
		response_type: 'code',
		prompt: 'consent',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile',
			'https://www.googleapis.com/auth/userinfo.email'
		].join(' ')
	}

	// Create OAuth URL
	const url = `${rootUrl}?${new URLSearchParams(options).toString()}`
	// Redirect user to Google's URL for login
	window.location.href = url
}
