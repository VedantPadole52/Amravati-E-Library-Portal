# 🚀 Quick Start - Run in One Command

Choose your operating system and run ONE file to get started!

---

## 🖥️ Windows Users

Run this file:
```bash
start.bat
```

Or double-click `start.bat` in File Explorer.

---

## 🍎 macOS Users

Open Terminal and run:
```bash
chmod +x start.sh
./start.sh
```

Or just copy-paste:
```bash
bash start.sh
```

---

## 🐧 Linux Users

Open Terminal and run:
```bash
chmod +x start.sh
./start.sh
```

Or just copy-paste:
```bash
bash start.sh
```

---

## 🔧 All Platforms (Node.js)

Works on Windows, Mac, and Linux:
```bash
node start.js
```

---

## ⚙️ What These Files Do

When you run the startup file, it will:

1. ✅ Check if dependencies are installed
   - If not, runs `npm install` automatically
2. ✅ Create `.env` file (if it doesn't exist)
3. ✅ Ask you to configure `DATABASE_URL`
   - Follow the instructions shown
4. ✅ Initialize the database
   - Runs `npm run db:push` automatically
5. ✅ Start the application
   - Opens on `http://localhost:5000`

---

## 📋 Requirements Before Running

You MUST have these installed:

- ✅ **Node.js** (v18 or higher)
  - Download: https://nodejs.org/
- ✅ **PostgreSQL** (v12 or higher)
  - Download: https://www.postgresql.org/download/
  - PostgreSQL must be **running** on your system

---

## 🔐 Database Setup

Before running the startup file, create a PostgreSQL database:

**Option A: Command Line**
```bash
psql -U postgres
CREATE DATABASE elibrary;
\q
```

**Option B: pgAdmin GUI**
- Open pgAdmin
- Right-click Databases → Create → Database
- Name: `elibrary`

---

## 🔑 Environment Variables

The startup file will ask you for `DATABASE_URL`. Provide it in this format:

```
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/elibrary
```

Replace `YOUR_PASSWORD` with your PostgreSQL password from installation.

---

## 🎮 Test Account

After startup, login with:

**Citizen Account:**
- Email: `demo@user.com`
- Password: `user123`

**Admin Account:**
- Email: `admin@amc.edu`
- Password: `admin123`

---

## 🆘 Troubleshooting

### "PostgreSQL not found"
- Install PostgreSQL: https://www.postgresql.org/download/
- Make sure it's running (not just installed)

### "npm: command not found"
- Install Node.js: https://nodejs.org/
- Restart your terminal

### "Database connection error"
- Verify DATABASE_URL is correct
- Check PostgreSQL is running
- Check database `elibrary` exists

### "Port 5000 in use"
- Another app is using port 5000
- Close that app and try again

---

## 📖 Need More Help?

- Local setup details: See `SETUP_GUIDE.md`
- Deployment guide: See `DEPLOYMENT.md`
- All documentation: See `DOCUMENTATION_INDEX.md`

---

## ✨ You're All Set!

```bash
# Pick your OS and run ONE command:

# Windows:
start.bat

# Mac/Linux:
./start.sh

# Any OS:
node start.js
```

**That's it! Your app will be running in 1-2 minutes!** 🎉

---

**Questions? Check the docs or see troubleshooting above.** 📚
