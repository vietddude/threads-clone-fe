# Threads Update

This project is a social media application built with React, TypeScript, and Vite. It features infinite scrolling, user authentication, and various post interactions such as likes, replies, and reposts.

## Table of Contents

- [Installation](#installation)
- [Development](#development)
- [Build](#build)
- [Linting](#linting)
- [Prettier](#prettier)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the project dependencies, run:

```sh
bun install
```

## Development

To start the development server, run:

```sh
bun run dev
```

This will start the Vite development server with hot module replacement.

## Build

To build the project for production, run:

```sh
bun run build
```

The build artifacts will be stored in the `dist` directory.

## Linting

To lint the project, run:

```sh
bun run lint
```

To automatically fix linting errors, run:

```sh
bun run lint:fix
```

## Prettier

To check the code formatting, run:

```sh
bun run prettier
```

To automatically format the code, run:

```sh
bun run prettier:fix
```

## Environment Variables

The project uses environment variables defined in the `.env` file. Here are the required variables:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_AUTHORIZED_REDIRECT_URI=your_google_redirect_uri
VITE_API_URL=your_api_url
VITE_UPLOADTHING_TOKEN=your_uploadthing_token
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
VITE_CLOUDINARY_API_KEY=your_cloudinary_api_key
```

## Project Structure

The project structure is as follows:

```
.env
.gitignore
.prettierignore
.prettierrc
bun.lockb
eslint.config.js
index.html
package.json
postcss.config.js
public/
README.md
src/
	api/
		api-client.ts
		index.ts
		upload-image.ts
	assets/
	components/
		auth/
		buttons/
		cards/
		create-post-input.tsx
		create-with-input.tsx
		forms/
		...
	hooks/
		...
	lib/
	main.tsx
	routes/
	routeTree.gen.ts
	store/
	styles/
	types/
	vite-env.d.ts
tailwind.config.js
tailwind.config.ts
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
