@echo off
REM Amravati E-Library Portal - Quick Start for Windows

echo.
echo ===================================================
echo   Amravati E-Library Portal - Quick Start
echo ===================================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo [*] Installing dependencies...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Failed to install dependencies
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed
    echo.
) else (
    echo [OK] Dependencies already installed
    echo.
)

REM Check if .env exists
if not exist ".env" (
    if exist ".env.example" (
        echo [*] Creating .env file...
        copy .env.example .env
        echo [OK] Created .env file
        echo.
    )
)

REM Check if DATABASE_URL is configured
findstr /M "DATABASE_URL=postgresql://" .env >nul
if errorlevel 1 (
    echo [!] DATABASE_URL not configured in .env
    echo.
    echo [SETUP REQUIRED]
    echo 1. Make sure PostgreSQL is running
    echo 2. Create database: psql -U postgres
    echo    ^> CREATE DATABASE elibrary;
    echo    ^> \q
    echo 3. Edit .env and set DATABASE_URL:
    echo    DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/elibrary
    echo.
    set /p response="Have you set up DATABASE_URL in .env? (y/n): "
    if /i not "%response%"=="y" (
        echo [ERROR] Please configure DATABASE_URL in .env and try again
        pause
        exit /b 1
    )
)

REM Initialize database
echo [*] Initializing database...
call npm run db:push
echo [OK] Database initialized
echo.

REM Start application
echo ===================================================
echo   Starting Application...
echo ===================================================
echo.
echo [OK] Server starting on http://localhost:5000
echo.
echo Test Credentials:
echo   Citizen: demo@user.com / user123
echo   Admin: admin@amc.edu / admin123
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
