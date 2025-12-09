# 📚 Amravati E-Library Portal
Amravati E-Library (AI-Assisted Build) This project was built to explore the capabilities of Lovable.dev and Replit for rapid prototyping.

A digital library for Amravati Municipal Corporation where people can read books online.

## 🎯 What This Project Does

**For Citizens:**
- 📚 Browse and read 1000+ books
- 🔍 Search books by title, author, category
- 📖 Read books online or download PDFs
- ⭐ Rate and review books
- 📝 Save books to wishlist
- 🎯 Track reading progress
- 🏅 Earn achievements and badges
- 🔥 Build reading streaks

**For Admins:**
- ➕ Add new books with PDF upload
- 📊 See analytics dashboard
- 👥 Manage users
- 🎤 Post announcements
- 📈 Generate reports (PDF, Excel)
- 🤖 Generate AI-powered book summaries

## 🛠️ Technology Used

- **Frontend:** React (website interface)
- **Backend:** Express (server)
- **Database:** PostgreSQL (store data)
- **Styling:** Tailwind CSS (make it pretty)
- **AI:** OpenAI (book summaries)

## 📊 Features

✅ User Login & Registration
✅ Search & Filter Books
✅ Read Books Online
✅ Download PDF
✅ Reading History
✅ Wishlist
✅ Book Ratings & Reviews
✅ Admin Dashboard
✅ Book Management
✅ User Management
✅ Analytics
✅ PDF Reports
✅ Excel Export
✅ Dark/Light Mode
✅ Multiple Languages (English, Marathi, Hindi)

## 📋 System Requirements

**You need to install:**

1. **Node.js** (v18 or higher)
   - Website: https://nodejs.org/
   - This runs the application

2. **PostgreSQL** (v12 or higher)
   - Website: https://www.postgresql.org/download/
   - This stores the data

3. **Git** (optional, for version control)
   - Website: https://git-scm.com/

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Create Database
```bash
psql -U postgres
CREATE DATABASE elibrary;
\q
```

### Step 3: Create .env File
```bash
cp .env.example .env
# Edit .env and add your PostgreSQL password
```

### Step 4: Run Locally
```bash
npm run dev
# Open: http://localhost:5000
```

**Or use the startup file:**
```bash
# Windows:
start.bat

# Mac/Linux:
bash start.sh

# Any OS:
node start.js
```

## 🔑 Demo Credentials

**Citizen Login:**
- Email: `demo@user.com`
- Password: `user123`

**Admin Login:**
- Email: `admin@amc.edu`
- Password: `admin123`

## 📁 Project Structure

```
elibrary-portal/
├── client/              ← Website (React)
├── server/              ← Backend API (Express)
├── shared/              ← Shared code (Database schema)
├── public/              ← Static files
├── package.json         ← Dependencies
├── .env.example         ← Environment template
├── README.md            ← This file
├── RUN_LOCALLY.md       ← How to run locally
├── DEPLOYMENT.md        ← How to deploy
├── start.js             ← Auto setup (Node.js)
├── start.sh             ← Auto setup (Mac/Linux)
└── start.bat            ← Auto setup (Windows)
```

## 🗄️ Database Tables

- **users** - User accounts and profiles
- **books** - Book catalog
- **categories** - Book categories
- **reading_history** - What users read
- **announcements** - Admin announcements
- **reading_streaks** - Reading streaks
- **reading_goals** - Reading goals
- **book_ratings** - Book ratings and reviews
- **reading_wishlist** - User wishlists
- **achievements** - User badges

## 📝 Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Initialize/sync database
npm run db:push

# Open database GUI
npm run db:studio
```

## 📚 Documentation Files

- **README.md** ← You are here (Project overview)
- **RUN_LOCALLY.md** ← Step-by-step to run locally
- **DEPLOYMENT.md** ← Step-by-step to deploy
- **start.js/start.sh/start.bat** ← Auto setup files

## 🆘 Troubleshooting

### "npm: command not found"
→ Install Node.js from https://nodejs.org/

### "PostgreSQL not found"
→ Install PostgreSQL from https://www.postgresql.org/download/

### "Database connection error"
→ Check `.env` file has correct DATABASE_URL

### "Port 5000 already in use"
→ Set `PORT=3000 npm run dev` for different port

### "Cannot connect to database"
→ Make sure PostgreSQL service is running on your system

## 🚀 Next Steps

1. ✅ Install Node.js and PostgreSQL
2. ✅ Run: `npm install`
3. ✅ See: **RUN_LOCALLY.md** for full setup
4. ✅ See: **DEPLOYMENT.md** for going live

## 📞 Quick Reference

| What to Do | See |
|-----------|-----|
| Run locally | RUN_LOCALLY.md |
| Deploy online | DEPLOYMENT.md |
| Auto setup | start.bat (Windows) or start.sh (Mac/Linux) |
| Environment variables | .env.example |

## ✨ Key Features Explained

### Reading History
See all books you've read and your progress.

### Wishlist
Save books to read later.

### Achievements
Earn badges for:
- Reading 7 days in a row
- Reading 10 books
- First book completed
- And more!

### Reading Streak
Number of consecutive days you've read.

### Book Ratings
Rate books 1-5 stars and write reviews.

### Admin Analytics
See:
- Total users
- Books read
- Popular categories
- Top books

### PDF Reports
Download library statistics as PDF or Excel.

## 🔐 Security

- Passwords are encrypted
- Sessions are secure
- Only admins can add books
- User data is protected

## 📱 Device Support

✅ Desktop (Windows, Mac, Linux)
✅ Tablet
✅ Mobile (iPhone, Android)

## 🌐 Languages Supported

✅ English
✅ Marathi
✅ Hindi

## 📊 Performance

- Handles 1000+ books
- Fast search results
- Responsive design
- Optimized for mobile

## 🎓 Learning Path

1. Start with login
2. Browse books
3. Read a book
4. Rate and review
5. Check profile and achievements
6. (If admin) Manage books and users

## ❓ FAQ

**Q: Do I need internet?**
A: Yes, to access the app. But can work with slow connection.

**Q: Can I download books?**
A: Yes, PDFs can be downloaded offline reading.

**Q: How many users can use it?**
A: Unlimited, but recommended for 100+ users.

**Q: Can I change the branding?**
A: Yes, edit colors and text in settings.

**Q: Is it free?**
A: Yes, but hosting costs money (see DEPLOYMENT.md).

## 🎯 Get Started Now!

```bash
# Option 1: Auto setup (Easiest)
bash start.sh          # Mac/Linux
# or
start.bat              # Windows

# Option 2: Manual setup (Full control)
npm install
npm run db:push
npm run dev
```

Then open: **http://localhost:5000**

## 📚 Files To Read

| File | Purpose |
|------|---------|
| This file (README.md) | Project overview ← You are here |
| RUN_LOCALLY.md | How to run locally |
| DEPLOYMENT.md | How to deploy |
| .env.example | Environment template |

---

**Ready to start? See RUN_LOCALLY.md!** 🚀

Good luck! 📚
