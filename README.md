# Job Hunt Dashboard

A comprehensive dashboard application for managing your job hunt process. Built with Next.js and shadcn/ui.

## Features

- **Dashboard Overview**: Quick stats, recent applications, and role type management
- **Applications Tracker**: Track applications across different stages
- **Experience Bank**: Maintain a repository of work experiences, projects, and education
- **Resume Manager**: Create and manage multiple resume versions
- **Role Type Management**: Define different position types you're targeting
- **Networking Tools**: Track professional contacts and networking activities
- **Resources Hub**: Store job search resources and interview preparation materials

## Technology Stack

- **Frontend**: Next.js with TypeScript
- **UI Components**: shadcn/ui (based on Radix UI)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Persistence**: Local storage (MVP)

## Project Structure

The application follows a feature-based organization:

- `/components`: Reusable UI components
  - `/layout`: Layout components like sidebar and main layout
  - `/dashboard`: Dashboard-specific components
  - `/ui`: shadcn UI components
- `/app`: Next.js app router pages
- `/lib`: Utility functions and hooks
- `/types`: TypeScript type definitions

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Current Status

This is a Rapid Simple Viable Product (RSVP) that demonstrates the core UI and structure of the application. The following pages are implemented:

- Dashboard overview
- Applications tracking
- Experience bank
- Resume manager

All data is currently mocked and not persistent. This is a frontend-only implementation to demonstrate the UI and UX of the application.

## Next Steps

- Implement data persistence using local storage
- Add forms for creating and editing entries
- Implement filtering and search functionality
- Add analytics visualizations
- Create export functionality for resumes
- Implement role type creation and management

## License

MIT 