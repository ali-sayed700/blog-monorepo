# Blog Application

A content-driven blog platform with a GraphQL API and Google authentication.

**Live demo:** https://foentend-monorepo-blog.vercel.app

## Overview

This is the frontend of a full-stack blog application, built as part of a monorepo. It renders blog content fetched from a GraphQL API and supports authenticated user sessions via Google Sign-In.

## Tech Stack

- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS
- **Data fetching:** React Query for server-state management and caching
- **API:** GraphQL (NestJS backend)
- **Database:** Prisma ORM with SQLite
- **Auth:** Google OAuth

## Features

- Server-rendered blog post pages for fast initial load and SEO
- Google Sign-In for authenticated actions
- Efficient server-state caching and background refetching via React Query
- Type-safe data layer end-to-end (TypeScript + Prisma + GraphQL)

## Getting Started

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000 to view it in the browser.

## What I'd improve next

- Add pagination/infinite scroll for the post list
- Add a rich-text editor for authoring posts
- Expand test coverage for GraphQL resolvers
