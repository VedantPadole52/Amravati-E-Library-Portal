#!/bin/bash

# Amravati E-Library Portal - Quick Start for Mac/Linux

echo ""
echo "===================================================="
echo "  Amravati E-Library Portal - Quick Start"
echo "===================================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "[*] Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ERROR] Failed to install dependencies"
        exit 1
    fi
    echo "[OK] Dependencies installed"
    echo ""
else
    echo "[OK] Dependencies already installed"
    echo ""
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo "[*] Creating .env file..."
        cp .env.example .env
        echo "[OK] Created .env file"
        echo ""
    fi
fi

# Check if DATABASE_URL is configured
if ! grep -q "DATABASE_URL=postgresql://" .env; then
    echo "[!] DATABASE_URL not configured in .env"
    echo ""
    echo "[SETUP REQUIRED]"
    echo "1. Make sure PostgreSQL is running"
    echo "2. Create database: psql -U postgres"
    echo "   > CREATE DATABASE elibrary;"
    echo "   > \\q"
    echo "3. Edit .env and set DATABASE_URL:"
    echo "   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/elibrary"
    echo ""
    read -p "Have you set up DATABASE_URL in .env? (y/n): " response
    if [ "$response" != "y" ] && [ "$response" != "Y" ]; then
        echo "[ERROR] Please configure DATABASE_URL in .env and try again"
        exit 1
    fi
fi

# Initialize database
echo "[*] Initializing database..."
npm run db:push
echo "[OK] Database initialized"
echo ""

# Start application
echo "===================================================="
echo "   Starting Application..."
echo "===================================================="
echo ""
echo "[OK] Server starting on http://localhost:5000"
echo ""
echo "Test Credentials:"
echo "   Citizen: demo@user.com / user123"
echo "   Admin: admin@amc.edu / admin123"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
