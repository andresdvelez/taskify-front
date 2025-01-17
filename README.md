<p align="center">
  <h1 align="center">Taskify Frontend</h1>
  <p align="center">Modern task management interface built with Next.js 15 and Screaming Architecture</p>
</p>

## Overview

Taskify Frontend is a modern, responsive web application built using Next.js 15, implementing a Screaming Architecture pattern for clear and maintainable code organization. The application provides an intuitive interface for managing tasks, projects, and team collaboration.

## Notion
[Link of Notion](https://aspiring-plum-d49.notion.site/17ece7ae9590808498e3d8164f9eb34a?v=17ece7ae959081d2b991000c95572145)

## Architecture

The project follows Screaming Architecture principles, where the directory structure immediately reveals the business domain:

```
src/
├── auth/           # Authentication related features
├── projects/       # Project management domain
├── common/         # Shared components and utilities
└── main/           # Core application setup
```

## Prerequisites

- [Bun](https://bun.sh/) (Recommended)
- Node.js 22+ (If not using Bun)

## Quick Start

1. **Clone the Repository**

   ```bash
   git clone https://github.com/andresdvelez/taskify-front.git
   cd taskify-front
   ```

2. **Environment Setup**

   ```bash
   # Copy the environment template
   cp .env.template .env
   ```

3. **Install Dependencies**

   ```bash
   # Using Bun (Recommended)
   bun install

   # Or using npm
   npm install
   ```

4. **Start Development Server**

   ```bash
   # Using Bun
   bun dev

   # Or using npm
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## Development

### Environment Variables

Ensure your `.env` file contains the necessary variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
I18NEXUS_API_KEY
```

### Available Scripts

```bash
# Development
bun dev         # Start development server

# Building
bun run build   # Create production build
bun start       # Start production server

```

## Features

- 🔒 Secure authentication system with OTP code
- 📊 Project management dashboard
- ✅ Task tracking and management

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
