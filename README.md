This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🏗️ Architecture

This project follows **[Feature-Sliced Design (FSD)](https://feature-sliced.design/)** methodology for code organization.

📖 **[Read Full FSD Documentation](./docs/FSD_ARCHITECTURE.md)**

### Quick Overview

```
├── app/          # Application layer (pages, layouts, providers)
├── widgets/      # Composite UI blocks
├── features/     # Business features (auth, posts, profile)
├── entities/     # Business entities (user, post)
└── shared/       # Reusable code (ui, api, hooks, utils)
```

### Key Principles

- **Layered architecture**: Higher layers can import from lower layers only
- **Public API**: Each slice exports through `index.ts`
- **Isolation**: Features don't depend on each other
- **Reusability**: Shared code has no business logic

## Getting Started

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com

# Revalidation Secret Token (for on-demand ISR)
REVALIDATION_SECRET_TOKEN=your_secret_token_here
```

**Generate a secure token for production:**

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32
```

For development, you can use a simple value like `dev_secret_123`.

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## ISR (Incremental Static Regeneration)

The homepage uses ISR with a 60-second revalidation interval. This means:

- Content is cached and served instantly
- Cache updates every 60 seconds in the background
- SEO-optimized with server-side rendering

### On-Demand Revalidation

You can trigger manual cache revalidation using the API endpoint:

```bash
# Revalidate the homepage
curl "http://localhost:3000/api/revalidate?secret=your_secret_token"

# Revalidate specific path
curl "http://localhost:3000/api/revalidate?secret=your_secret_token&path=/profile/123"

# Revalidate by tag
curl "http://localhost:3000/api/revalidate?secret=your_secret_token&tag=latest-posts"
```

Available tags:

- `users-count` - total registered users count
- `latest-posts` - latest 4 posts on homepage

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
