// Seed script for E-Library database
import { db } from "./db";
import { categories, books, users } from "@shared/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

// Book cover images from generated assets
const BOOK_COVERS = [
  "/assets/generated_images/history_book_cover.png",
  "/assets/generated_images/mathematics_book_cover.png",
  "/assets/generated_images/science_book_cover.png",
];

async function seed() {
  console.log("🌱 Starting database seed...");

  // Create demo users
  console.log("Creating demo users...");
  
  const userEmail = "demo@user.com";
  const adminEmail = "admin@amc.edu";
  
  const existingUser = await db.select().from(users).where(eq(users.email, userEmail)).limit(1);
  const existingAdmin = await db.select().from(users).where(eq(users.email, adminEmail)).limit(1);
  
  if (existingUser.length === 0) {
    await db.insert(users).values({
      name: "Rahul Verma",
      email: userEmail,
      phone: "9876543210",
      password: await bcrypt.hash("user123", 10),
      role: "citizen",
    });
    console.log("✓ Created demo citizen user (demo@user.com / user123)");
  }

  if (existingAdmin.length === 0) {
    await db.insert(users).values({
      name: "Admin User",
      email: adminEmail,
      phone: "9876543211",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    });
    console.log("✓ Created demo admin user (admin@amc.edu / admin123)");
  }

  // Create categories
  console.log("Creating categories...");
  const categoryData = [
    { name: "NCERT", description: "National Council of Educational Research and Training textbooks" },
    { name: "Competitive Exams", description: "UPSC, MPSC, Banking, and other competitive exam materials" },
    { name: "History", description: "Historical books and archives" },
    { name: "Science", description: "Science and technology books" },
    { name: "Mathematics", description: "Mathematics textbooks and references" },
    { name: "Literature", description: "Literature and language books" },
    { name: "General Knowledge", description: "General awareness and current affairs" },
  ];

  const createdCategories = [];
  for (const cat of categoryData) {
    const existing = await db.select().from(categories).where(eq(categories.name, cat.name)).limit(1);
    if (existing.length === 0) {
      const [created] = await db.insert(categories).values(cat).returning();
      createdCategories.push(created);
      console.log(`✓ Created category: ${cat.name}`);
    } else {
      createdCategories.push(existing[0]);
    }
  }

  // Create books
  console.log("Creating books...");
  const bookData = [
    {
      title: "Indian History Vol. 1 - Ancient India",
      author: "R.S. Sharma",
      categoryId: createdCategories.find(c => c.name === "History")?.id || 1,
      subcategory: "Ancient History",
      description: "Comprehensive guide to ancient Indian history covering Indus Valley Civilization to Gupta Empire",
      coverUrl: BOOK_COVERS[0],
      pdfUrl: "/sample.pdf",
      isbn: "978-8125028239",
      publishYear: 2005,
      pages: 320,
      language: "English",
    },
    {
      title: "Advanced Calculus for Engineers",
      author: "H.K. Dass",
      categoryId: createdCategories.find(c => c.name === "Mathematics")?.id || 2,
      subcategory: "Engineering Mathematics",
      description: "Complete guide to calculus for engineering students with solved examples",
      coverUrl: BOOK_COVERS[1],
      pdfUrl: "/sample.pdf",
      isbn: "978-8121925730",
      publishYear: 2018,
      pages: 650,
      language: "English",
    },
    {
      title: "Environmental Science and Ecology",
      author: "Erach Bharucha",
      categoryId: createdCategories.find(c => c.name === "Science")?.id || 3,
      subcategory: "Environmental Studies",
      description: "Comprehensive textbook on environmental science and sustainable development",
      coverUrl: BOOK_COVERS[2],
      pdfUrl: "/sample.pdf",
      isbn: "978-8173718854",
      publishYear: 2013,
      pages: 540,
      language: "English",
    },
    {
      title: "Indian Polity for Civil Services Examination",
      author: "M. Laxmikanth",
      categoryId: createdCategories.find(c => c.name === "Competitive Exams")?.id || 4,
      subcategory: "UPSC Preparation",
      description: "The most comprehensive and authoritative book on Indian Constitution and Governance",
      coverUrl: BOOK_COVERS[0],
      pdfUrl: "/sample.pdf",
      isbn: "978-9352520138",
      publishYear: 2020,
      pages: 680,
      language: "English",
    },
    {
      title: "General Knowledge 2024",
      author: "Manohar Pandey",
      categoryId: createdCategories.find(c => c.name === "General Knowledge")?.id || 5,
      subcategory: "Current Affairs",
      description: "Latest updates on national and international affairs for competitive exams",
      coverUrl: BOOK_COVERS[1],
      pdfUrl: "/sample.pdf",
      isbn: "978-9352520145",
      publishYear: 2024,
      pages: 420,
      language: "English",
    },
    {
      title: "Physics for Engineers - Volume 1",
      author: "Gaur & Gupta",
      categoryId: createdCategories.find(c => c.name === "Science")?.id || 3,
      subcategory: "Physics",
      description: "Fundamental physics concepts for engineering students",
      coverUrl: BOOK_COVERS[2],
      pdfUrl: "/sample.pdf",
      isbn: "978-8173715846",
      publishYear: 2016,
      pages: 580,
      language: "English",
    },
    {
      title: "NCERT Class 10 Science",
      author: "NCERT",
      categoryId: createdCategories.find(c => c.name === "NCERT")?.id || 6,
      subcategory: "Class 10",
      description: "Official NCERT science textbook for class 10 students",
      coverUrl: BOOK_COVERS[2],
      pdfUrl: "/sample.pdf",
      isbn: "978-8174506726",
      publishYear: 2023,
      pages: 280,
      language: "English",
    },
    {
      title: "NCERT Class 10 Mathematics",
      author: "NCERT",
      categoryId: createdCategories.find(c => c.name === "NCERT")?.id || 6,
      subcategory: "Class 10",
      description: "Official NCERT mathematics textbook for class 10 students",
      coverUrl: BOOK_COVERS[1],
      pdfUrl: "/sample.pdf",
      isbn: "978-8174506733",
      publishYear: 2023,
      pages: 320,
      language: "English",
    },
    {
      title: "NCERT Class 12 History - Themes in Indian History",
      author: "NCERT",
      categoryId: createdCategories.find(c => c.name === "NCERT")?.id || 6,
      subcategory: "Class 12",
      description: "Comprehensive history textbook covering ancient to modern India",
      coverUrl: BOOK_COVERS[0],
      pdfUrl: "/sample.pdf",
      isbn: "978-8174506740",
      publishYear: 2023,
      pages: 380,
      language: "English",
    },
    {
      title: "Banking Awareness for IBPS 2024",
      author: "Arihant Experts",
      categoryId: createdCategories.find(c => c.name === "Competitive Exams")?.id || 4,
      subcategory: "Banking",
      description: "Complete guide for banking awareness for IBPS and other banking exams",
      coverUrl: BOOK_COVERS[1],
      pdfUrl: "/sample.pdf",
      isbn: "978-9352520152",
      publishYear: 2024,
      pages: 320,
      language: "English",
    },
  ];

  for (const book of bookData) {
    const existing = await db.select().from(books).where(eq(books.title, book.title)).limit(1);
    if (existing.length === 0) {
      await db.insert(books).values(book);
      console.log(`✓ Created book: ${book.title}`);
    }
  }

  console.log("✅ Database seeding completed!");
  console.log("\n📋 Demo Credentials:");
  console.log("   Citizen: demo@user.com / user123");
  console.log("   Admin: admin@amc.edu / admin123\n");
}

seed()
  .catch((error) => {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
