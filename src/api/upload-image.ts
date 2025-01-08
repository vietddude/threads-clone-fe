import axios from 'axios'
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../lib/config'

const CLOUD_NAME = CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = CLOUDINARY_UPLOAD_PRESET
const API_KEY = CLOUDINARY_API_KEY

const uploadToCloudinary = async (file: File): Promise<string> => {
	if (!file) throw new Error('No file provided')

	const formData = new FormData()
	formData.append('file', file)
	formData.append('upload_preset', UPLOAD_PRESET)
	formData.append('api_key', API_KEY)
	formData.append('public_id', file.name)

	try {
		const response = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})

		return response.data.secure_url
	} catch (error) {
		console.error('Upload failed:', error)
		throw new Error('Upload failed')
	}
}

export const uploadImage = async (file: File): Promise<string> => {
	const imageUrl = await uploadToCloudinary(file)
	return imageUrl
}

export const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
	if (!files || files.length === 0) return []

	try {
		const uploadPromises = files.map((file) => uploadToCloudinary(file))
		const imageUrls = await Promise.all(uploadPromises)
		return imageUrls
	} catch (error) {
		console.error('Upload multiple images failed:', error)
		throw error // Propagate error for further handling
	}
}
