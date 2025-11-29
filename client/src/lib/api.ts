// API client for E-Library Portal

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface UserStats {
  booksRead: number;
  borrowed: number;
  points: number;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  categoryId: number | null;
  subcategory: string | null;
  description: string | null;
  coverUrl: string | null;
  pdfUrl: string | null;
  isbn: string | null;
  publishYear: number | null;
  pages: number | null;
  language: string | null;
  createdAt: string;
}

export interface ReadingHistory {
  id: number;
  userId: string;
  bookId: number;
  progress: number | null;
  lastReadPage: number | null;
  isBookmarked: boolean | null;
  lastAccessedAt: string;
  completedAt: string | null;
}

async function apiCall(endpoint: string, options?: RequestInit) {
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

// Auth APIs
export const authApi = {
  login: async (email: string, password: string) => {
    return apiCall("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (name: string, email: string, password: string, phone?: string) => {
    return apiCall("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, phone }),
    });
  },

  logout: async () => {
    return apiCall("/auth/logout", {
      method: "POST",
    });
  },

  getCurrentUser: async (): Promise<{ user: User; stats: UserStats }> => {
    return apiCall("/auth/me");
  },
};

// Book APIs
export const booksApi = {
  getAll: async (search?: string): Promise<{ books: Book[] }> => {
    const query = search ? `?search=${encodeURIComponent(search)}` : "";
    return apiCall(`/books${query}`);
  },

  getById: async (id: number): Promise<{ book: Book }> => {
    return apiCall(`/books/${id}`);
  },

  create: async (book: Partial<Book>) => {
    return apiCall("/books", {
      method: "POST",
      body: JSON.stringify(book),
    });
  },

  update: async (id: number, book: Partial<Book>) => {
    return apiCall(`/books/${id}`, {
      method: "PATCH",
      body: JSON.stringify(book),
    });
  },

  delete: async (id: number) => {
    return apiCall(`/books/${id}`, {
      method: "DELETE",
    });
  },
};

// Reading History APIs
export const readingHistoryApi = {
  getAll: async (): Promise<{ history: ReadingHistory[] }> => {
    return apiCall("/reading-history");
  },

  getRecent: async (limit: number = 5): Promise<{ recent: ReadingHistory[] }> => {
    return apiCall(`/reading-history/recent?limit=${limit}`);
  },

  updateProgress: async (bookId: number, progress: number, lastReadPage?: number) => {
    return apiCall("/reading-history", {
      method: "POST",
      body: JSON.stringify({ bookId, progress, lastReadPage }),
    });
  },

  toggleBookmark: async (bookId: number) => {
    return apiCall(`/reading-history/bookmark/${bookId}`, {
      method: "POST",
    });
  },
};

// Admin APIs
export const adminApi = {
  getAnalytics: async (): Promise<{
    totalUsers: number;
    totalBooks: number;
    todayVisits: number;
    activeUsers: number;
  }> => {
    return apiCall("/admin/analytics");
  },

  getSessions: async () => {
    return apiCall("/admin/sessions");
  },
};
