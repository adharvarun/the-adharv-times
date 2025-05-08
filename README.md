# The Adharv Times

A modern blog built with [Next.js](https://nextjs.org), [Sanity](https://www.sanity.io/), and [Tailwind CSS](https://tailwindcss.com/).

## Features

- Next.js App Router
- Sanity Studio for content management (`/studio`)
- Blog posts with categories, authors, and rich content
- Responsive, dark-mode friendly UI
- Portable Text rendering with custom components
- Image optimization via Sanity CDN

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Set up environment variables:**

   Create a `.env.local` file with:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_dataset
   NEXT_PUBLIC_SANITY_API_VERSION=2025-05-04
   ```

3. **Run the development server:**

   ```sh
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the site.

4. **Access Sanity Studio:**

   Visit [http://localhost:3000/studio](http://localhost:3000/studio) to manage content.

## Project Structure

- `/src/app` – Next.js app directory (pages, components, layout)
- `/src/sanity` – Sanity schemas, client, and utilities
- `/public` – Static assets (images, icons)
- `/sanity.config.ts` – Sanity Studio configuration

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Run ESLint

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js.

---

Made with ❤️ by [Adharv Arun](https://github.com/adharvarun)