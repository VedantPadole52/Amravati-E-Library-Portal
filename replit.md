# Amravati Municipal Corporation - E-Library Portal

## Overview

This is a full-stack digital library portal for the Amravati Municipal Corporation, designed to provide citizens with access to a comprehensive collection of books, NCERTs, and historical archives. The application features distinct user experiences for citizens and administrators, with a strong emphasis on government authenticity combined with modern digital engagement and gamification features.

The portal serves as a secure gateway to learning, offering thousands of searchable resources accessible from anywhere. It implements session-based authentication, real-time user tracking, comprehensive book management capabilities, file upload support for PDF documents, live analytics dashboard, PDF and Excel report generation, user management with blocking capabilities, and unique engagement features like reading streaks, goals, ratings/reviews, wishlist, and achievements.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Features Added (Latest Session)

### Printable Reports ✨
- **Print-Friendly Reports**: Browser-based printing with formatted report data
- **System Overview Report**: Total users, books, visits, categories, top books
- **Daily Activity Charts**: Last 7 days of user visits in table format
- **Category Distribution**: Book counts per category with percentages
- **Top Books Table**: Most read books statistics

### AI-Powered Book Summaries ✨ (NEW)
- **AI Summary Generation**: Automatically generates book summaries using OpenAI GPT-5
- **Admin Control**: Admin can generate/regenerate summaries for any book
- **Summary Display**: Shows AI-generated summaries to all users
- **Database Storage**: Summaries cached in database with generation timestamp
- **User-Friendly**: Beautiful UI component with loading states and error handling

### Admin-to-Citizen Book Sync (Fixed)
- Books added by admin now sync to citizen portal within 3 seconds
- Real data syncing (title, author, ISBN, category, cover)
- Citizen dashboard auto-refreshes every 3 seconds to show new books

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
- `/profile` - User profile with reading stats and achievements
- `/portal/admin-access` - Admin login
- `/admin/dashboard` - Admin dashboard with real-time analytics
- `/admin/books` - Book manager with PDF upload
- `/admin/users` - User management and blocking
- `/admin/categories` - Category management
- `/admin/settings` - Theme settings
- `/admin/announcements` - Post and manage announcements
- `/admin/reports` - Generate PDF, Excel, and printable reports
- `/admin/reports/printable` - Browser-based printable reports (NEW)

**UI Component System:**
- shadcn/ui component library built on Radix UI primitives
- Tailwind CSS v4 with custom design tokens for government branding
- Royal Deep Blue (#0A346F), Digital Green (#008C45), Saffron (#FF9933)
- Dark mode support throughout the app
- BookSummary component for AI-generated summaries (NEW)

### Backend Architecture

**Server Framework:**
- Express.js for RESTful API endpoints
- Multer for file upload handling
- Session middleware with PostgreSQL-backed session store
- PDFKit for PDF generation
- XLSX for Excel export
- OpenAI GPT-5 for AI-powered summaries (NEW)

**API Routes:**
- `/api/auth/*` - Authentication (login, logout, register, current user)
- `/api/books/*` - Book CRUD operations, search
- `/api/books/:id/generate-summary` - Generate AI summary for book (NEW)
- `/api/categories/*` - Category management
- `/api/admin/users` - Get all users
- `/api/admin/activity-logs` - Real-time activity logs
- `/api/admin/analytics-data` - Dashboard analytics (daily visits, category stats)
- `/api/admin/reports/:type` - Generate PDF reports (system, category, user-activity, circulation)
- `/api/admin/export/:type` - Export to Excel (system, users, categories, circulation)
- `/api/announcements` - Get and create announcements
- `/api/upload` - File upload for PDFs and images
- `/api/user/reading-streak` - User reading streak data
- `/api/user/reading-goal` - User reading goals
- `/api/user/achievements` - User achievements and badges
- `/api/user/wishlist` - User reading wishlist

**File Upload:**
- Endpoint: `POST /api/upload` (requires admin authentication)
- Supported formats: PDF, JPG, PNG
- Files stored in `/public/uploads/` with timestamps
- Returns file URL for database storage

### Data Storage & ORM

**Database:**
- PostgreSQL with Drizzle ORM
- Tables: users, books, categories, reading_history, active_sessions, announcements, reading_streaks, reading_goals, book_ratings, reading_wishlist, achievements

**Book Table Enhancements:**
- `aiSummary` - Stores AI-generated book summaries
- `summaryGeneratedAt` - Timestamp when summary was generated

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
- **AI-powered book summaries (NEW)**

### AI Features
- **GPT-5 Summary Generation**: Generates 2-3 paragraph summaries for books
- **Admin Controls**: Generate/regenerate summaries anytime
- **Smart Caching**: Summaries stored in database to reduce API calls

### Gamification
- Reading Streaks (consecutive days)
- Reading Goals (annual targets)
- Achievement Badges (7-day streak, 10 books, first review, etc)
- User Profile showcasing stats and achievements

### Analytics & Reporting
- Real-time dashboard with active user charts
- Category distribution pie chart with 6 unique colors
- Top books by popularity
- **Printable reports with browser print (NEW)**
- 4 different report types (PDF)
- Excel export for data analysis
- Daily visit trends from actual session data

### Admin Features
- Comprehensive admin dashboard
- Category management (create/delete)
- User management with blocking
- Announcement posting system
- **AI Summary generation for books (NEW)**
- PDF & Excel report generation
- **Printable reports (NEW)**
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

## Required Environment Variables

```
OPENAI_API_KEY=your_openai_api_key_here
```

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
- openai - AI-powered summaries (NEW)

## Database Tables

1. **users** - User accounts with roles
2. **books** - Book catalog with metadata + AI summaries
3. **categories** - Book categories
4. **reading_history** - User reading progress
5. **active_sessions** - Real-time user sessions
6. **announcements** - Admin announcements
7. **reading_streaks** - User reading streaks
8. **reading_goals** - Annual reading targets
9. **book_ratings** - Book ratings and reviews
10. **reading_wishlist** - User wishlists
11. **achievements** - User badges and achievements

