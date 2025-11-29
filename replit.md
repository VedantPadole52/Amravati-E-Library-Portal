# Amravati Municipal Corporation - E-Library Portal

## Overview

This is a full-stack digital library portal for the Amravati Municipal Corporation, designed to provide citizens with access to a comprehensive collection of books, NCERTs, and historical archives. The application features distinct user experiences for citizens and administrators, with a strong emphasis on government authenticity combined with modern digital engagement and gamification features.

The portal serves as a secure gateway to learning, offering thousands of searchable resources accessible from anywhere. It implements session-based authentication, real-time user tracking, comprehensive book management capabilities, file upload support for PDF documents, and unique engagement features like reading streaks and achievement badges.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Features Added (Latest Session)

### Unique Engagement Features ✨
- **Reading Streaks**: Track consecutive days of reading with current and longest streak counters
- **Reading Goals**: Set annual book reading targets and track progress with visual charts
- **Book Ratings & Reviews**: Citizens can rate books 1-5 stars and leave written reviews
- **Reading Wishlist**: Save books to read later and build personal reading lists
- **Achievements & Badges**: Earn badges for milestones (7-day streak, 10 books read, first review, etc)
- **User Profile Page**: New `/profile` page showcasing all reading stats and achievements

### Report Generation (PDF & Excel)
- **4 Report Types**: System Overview, Category Statistics, User Activity, Book Circulation
- **PDF Reports**: Professional formatted PDFs with Amravati branding
- **Excel Export**: Multi-sheet Excel workbooks for data analysis
- **Admin Reports Page**: Dedicated `/admin/reports` page with download buttons

### Latest News Modal
- **Latest News Button**: Added to header navigation for easy access to announcements
- **Modal Popup**: Shows all announcements with full details and formatting
- **Announcement Counter**: Badge showing number of active announcements
- **Works on Mobile**: Full responsive design for all screen sizes

### Analytics & Data Fixes
- **Today's Visits Fix**: Now counts from active sessions (actual page visits) not just reading history
- **Daily Chart Data**: Shows distinct active users per day with proper day labels
- **Category Pie Chart**: Displays book distribution with interactive colored badges and percentages
- **Real-time Updates**: All data pulls from actual database, no mock data

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing

**Pages:**
- `/` - Landing page
- `/login` - Citizen login
- `/register` - Citizen registration
- `/citizen/dashboard` - Citizen library portal
- `/citizen/reading-history` - Reading progress tracking
- `/citizen/question-banks` - MPSC/UPSC question banks
- `/profile` - User profile with reading stats and achievements (NEW)
- `/portal/admin-access` - Admin login
- `/admin/dashboard` - Admin dashboard with real-time analytics
- `/admin/books` - Book manager with PDF upload
- `/admin/users` - User management and blocking
- `/admin/categories` - Category management
- `/admin/settings` - Theme settings
- `/admin/announcements` - Post and manage announcements
- `/admin/reports` - Generate PDF and Excel reports

**UI Component System:**
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS v4 with custom design tokens for government branding
- Royal Deep Blue (#0A346F), Digital Green (#008C45), Saffron (#FF9933)
- Dark mode support throughout the app

### Backend Architecture

**Server Framework:**
- Express.js for RESTful API endpoints
- Multer for file upload handling
- Session middleware with PostgreSQL-backed session store
- PDFKit for PDF generation
- XLSX for Excel export

**API Routes:**
- `/api/auth/*` - Authentication (login, logout, register, current user)
- `/api/books/*` - Book CRUD operations, search
- `/api/categories/*` - Category management
- `/api/admin/users` - Get all users
- `/api/admin/activity-logs` - Real-time activity logs
- `/api/admin/analytics-data` - Dashboard analytics (daily visits, category stats)
- `/api/admin/reports/:type` - Generate PDF reports (system, category, user-activity, circulation)
- `/api/admin/export/:type` - Export to Excel (system, users, categories, circulation)
- `/api/announcements` - Get and create announcements
- `/api/upload` - File upload for PDFs and images
- `/api/user/reading-streak` - User reading streak data (NEW)
- `/api/user/reading-goal` - User reading goals (NEW)
- `/api/user/achievements` - User achievements and badges (NEW)
- `/api/user/wishlist` - User reading wishlist (NEW)

**File Upload:**
- Endpoint: `POST /api/upload` (requires admin authentication)
- Supported formats: PDF, JPG, PNG
- Files stored in `/public/uploads/` with timestamps
- Returns file URL for database storage

### Data Storage & ORM

**Database:**
- PostgreSQL with Drizzle ORM
- Tables: users, books, categories, reading_history, active_sessions, announcements, reading_streaks, reading_goals, book_ratings, reading_wishlist, achievements

**Analytics Queries:**
- Daily visits (last 7 days) from active sessions
- Category distribution (book counts per category)
- Top books by reads
- User activity logs with timestamps
- Reading streaks and goals tracking
- Achievement tracking and badges

## Key Features Implemented

### User Management
- Citizen Registration with validation
- Admin User Dashboard with search functionality
- User blocking/unblocking capability
- Sorted user lists (newest first, A-Z, active/blocked)

### Book Management
- PDF upload support for books
- Cover image upload
- Google Books link integration
- Book search and filtering by category
- Book ratings and reviews system

### Gamification
- Reading Streaks (consecutive days)
- Reading Goals (annual targets)
- Achievement Badges (7-day streak, 10 books, first review, etc)
- User Profile showcasing stats and achievements

### Analytics & Reporting
- Real-time dashboard with active user charts
- Category distribution pie chart with 6 unique colors
- Top books by popularity
- 4 different report types (PDF)
- Excel export for data analysis
- Daily visit trends from actual session data

### Admin Features
- Comprehensive admin dashboard
- Category management (create/delete)
- User management with blocking
- Announcement posting system
- PDF & Excel report generation
- Analytics data export

### Community Features
- Announcements system with modal viewer
- Latest News section on home page
- Book ratings and reviews
- Reading wishlist (save for later)
- Question banks (MPSC/UPSC)

### Accessibility & Localization
- Dark/Light mode toggle
- Multi-language support (English, Marathi, Hindi)
- Dark mode CSS variables
- Mobile responsive design
- Accessible UI components

## Demo Credentials

**Citizen:**
- Email: `demo@user.com`
- Password: `user123`

**Admin:**
- Email: `admin@amc.edu`
- Password: `admin123`

## Key Libraries

- react-hook-form - Form validation
- @tanstack/react-query - Server state management
- recharts - Analytics charts
- lucide-react - Icons
- ws - WebSocket support
- multer - File uploads
- bcryptjs - Password hashing
- pdfkit - PDF generation
- xlsx - Excel export
- drizzle-orm - Database ORM

## Database Tables

1. **users** - User accounts with roles
2. **books** - Book catalog with metadata
3. **categories** - Book categories
4. **reading_history** - User reading progress
5. **active_sessions** - Real-time user sessions
6. **announcements** - Admin announcements
7. **reading_streaks** - User reading streaks (NEW)
8. **reading_goals** - Annual reading targets (NEW)
9. **book_ratings** - Book ratings and reviews (NEW)
10. **reading_wishlist** - User wishlists (NEW)
11. **achievements** - User badges and achievements (NEW)
