# Pokémon Explorer - 3D Interactive Application

## Overview

This is a modern full-stack web application that allows users to explore Pokémon data through an interactive 3D interface. The application features a sleek dark theme with glassmorphism effects, real-time Pokémon search, and immersive 3D visualizations. Built with React, TypeScript, and Express, it provides a seamless user experience for discovering Pokémon information.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Library**: Radix UI components with shadcn/ui for consistent, accessible design
- **Styling**: Tailwind CSS with custom CSS variables for theming and animations
- **3D Graphics**: Three.js with React Three Fiber for 3D particle backgrounds and future model rendering
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for type safety across the entire stack
- **API Integration**: RESTful integration with the PokéAPI for Pokémon data
- **Storage**: In-memory storage implementation with interface for future database integration
- **Session Management**: Prepared for connect-pg-simple for PostgreSQL session storage

### Database Schema
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Current Tables**: 
  - `users` table with id, username, and password fields
  - Prepared for future Pokémon-related tables

## Key Components

### Data Layer
- **Pokemon API Integration**: Direct integration with PokéAPI for real-time Pokémon data
- **Type Definitions**: Comprehensive TypeScript interfaces for Pokémon data structures
- **Query Management**: Optimized caching and error handling with React Query

### UI Components
- **Navigation**: Fixed glassmorphism navigation with 3D mode toggles
- **Search Interface**: Advanced search with quick-select options and real-time feedback
- **Pokemon Cards**: Interactive cards with type-based theming and 3D view buttons
- **Stats Display**: Animated progress bars and detailed stat breakdowns
- **3D Model Viewer**: Modal component prepared for interactive 3D Pokémon models

### Visual Effects
- **Particle Background**: Animated 3D particle system using Three.js
- **Glassmorphism**: CSS-based glass effects with backdrop blur
- **Type-based Theming**: Dynamic color schemes based on Pokémon types
- **Parallax Scrolling**: Smooth parallax effects for enhanced depth perception

## Data Flow

1. **Search Initiation**: User enters Pokémon name or ID in search component
2. **API Request**: React Query triggers request to PokéAPI via custom hook
3. **Data Processing**: Pokemon data is validated and transformed using TypeScript interfaces
4. **UI Update**: Components re-render with new data, applying type-based styling
5. **3D Integration**: 3D model viewer modal can be triggered for immersive experience
6. **State Persistence**: Query cache maintains data for optimal performance

## External Dependencies

### Core Technologies
- **PokéAPI**: Primary data source for all Pokémon information
- **Three.js**: 3D graphics rendering and particle systems
- **Radix UI**: Accessible, unstyled UI primitives
- **Tailwind CSS**: Utility-first CSS framework

### Development Tools
- **Vite**: Fast build tool with HMR and optimized production builds
- **TypeScript**: Static type checking and enhanced developer experience
- **ESBuild**: Fast JavaScript bundler for server-side code
- **Drizzle Kit**: Database schema management and migrations

### Future Integrations
- **Neon Database**: Serverless PostgreSQL for production data storage
- **WebGL/Three.js Models**: 3D Pokémon model rendering capabilities

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with Express backend
- **Hot Module Replacement**: Real-time code updates during development
- **TypeScript Compilation**: Continuous type checking and error reporting

### Production Build
- **Client Build**: Vite optimized production build with code splitting
- **Server Build**: ESBuild compilation with external package handling
- **Static Assets**: Optimized asset bundling and compression

### Database Preparation
- **Schema Management**: Drizzle migrations ready for PostgreSQL deployment
- **Environment Configuration**: DATABASE_URL environment variable support
- **Session Storage**: PostgreSQL-based session management prepared

## Changelog

```
Changelog:
- July 07, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```