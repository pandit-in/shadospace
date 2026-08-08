# Shadospace

Shadospace is a modern publishing platform built for developers, creators, and communities who want to share stories, ideas, and inspiration in a polished, expressive way.

## What makes Shadospace special update ✨

- **Developer-friendly content platform**: Create and publish posts with rich author profiles, images, and custom text content.
- **Server-rendered experience**: Built with Next.js using server-side database fetching for fast page loads and real-time content updates.
- **Authentication-ready**: Sign in and sign up flows are included so users can safely create, edit, and manage posts.
- **Image support**: Posts can include thumbnail images, with automatic display in feed and post pages.
- **Profile-driven community**: Each post links back to its author profile for a more connected experience.

## Features

- Home feed showing the latest posts
- Individual post pages with preview image and content reader
- Post creation and editing workflows
- User authentication with session support
- Clean UI components and responsive layout

## Tech stack

- Next.js 16
- React 19
- Drizzle ORM + Neon database
- Tailwind CSS
- UploadThing for image uploads
- Better Auth for authentication

## Project structure

- `app/` — Next.js app routes and pages
- `components/` — UI elements, forms, layout pieces
- `db/` — Drizzle database configuration and schema definitions
- `server/` — Post CRUD and data access utilities
- `lib/` — auth helpers and upload utilities
- `public/` — static assets and legal documents

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env`.
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:3000` in your browser.

## Notes

- The homepage is populated from the database, so make sure production and development are using the correct `DATABASE_URL`.
- Deleting posts should remove them from the database and the feed once the app fetches current data.

## Repository activity

- 2026-08-05 — Scheduled README activity check completed.

## License

This project is a developer-first publishing experience crafted for fast iteration and clean presentation.
