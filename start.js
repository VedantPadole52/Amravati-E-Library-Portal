#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

async function main() {
  console.log('\n🚀 Amravati E-Library Portal - Quick Start\n');

  try {
    // Step 1: Check if node_modules exists
    console.log('📦 Checking dependencies...');
    if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
      console.log('   Installing npm packages (this may take a few minutes)...');
      execSync('npm install', { stdio: 'inherit' });
      console.log('   ✅ Dependencies installed\n');
    } else {
      console.log('   ✅ Dependencies already installed\n');
    }

    // Step 2: Check if .env exists
    console.log('🔐 Setting up environment...');
    if (!fs.existsSync(path.join(__dirname, '.env'))) {
      if (fs.existsSync(path.join(__dirname, '.env.example'))) {
        fs.copyFileSync(
          path.join(__dirname, '.env.example'),
          path.join(__dirname, '.env')
        );
        console.log('   ✅ Created .env file from template\n');
      }
    } else {
      console.log('   ✅ .env file exists\n');
    }

    // Step 3: Check if DATABASE_URL is set
    const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
    
    if (!envContent.includes('DATABASE_URL=postgresql://')) {
      console.log('⚠️  DATABASE_URL not configured in .env\n');
      console.log('📝 Setup Instructions:');
      console.log('   1. Make sure PostgreSQL is running on your system');
      console.log('   2. Create a database: psql -U postgres');
      console.log('      → CREATE DATABASE elibrary;');
      console.log('      → \\q');
      console.log('   3. Edit the .env file and set DATABASE_URL:');
      console.log('      DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/elibrary\n');
      
      const response = await question('Have you set up DATABASE_URL in .env? (y/n): ');
      
      if (response.toLowerCase() !== 'y') {
        console.log('\n❌ Please configure DATABASE_URL in .env and try again.\n');
        rl.close();
        process.exit(1);
      }
    }

    // Step 4: Initialize database
    console.log('\n🗄️  Initializing database...');
    try {
      execSync('npm run db:push', { stdio: 'inherit' });
      console.log('✅ Database initialized\n');
    } catch (error) {
      console.log('\n⚠️  Database initialization had issues. Check your DATABASE_URL in .env\n');
    }

    // Step 5: Start the application
    console.log('🎯 Starting application...\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Server starting on http://localhost:5000');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('📚 Test Credentials:');
    console.log('   Citizen: demo@user.com / user123');
    console.log('   Admin: admin@amc.edu / admin123\n');
    console.log('Press Ctrl+C to stop the server\n');

    rl.close();
    execSync('npm run dev', { stdio: 'inherit' });
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    rl.close();
    process.exit(1);
  }
}

main();
