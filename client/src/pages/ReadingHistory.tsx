
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  History, 
  Bookmark, 
  Trash2,
  BookOpen,
  Clock,
  Calendar
} from "lucide-react";
import { readingHistoryApi, type ReadingHistory as ReadingHistoryType, type Book } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface ExtendedReadingHistory extends ReadingHistoryType {
  book?: Book;
}

export default function ReadingHistory() {
  const [history, setHistory] = useState<ExtendedReadingHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await readingHistoryApi.getAll();
      setHistory(data.history);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to load reading history",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromHistory = async (bookId: number) => {
    try {
      // In a real app, you'd have a delete endpoint
      setHistory(history.filter(h => h.bookId !== bookId));
      toast({
        title: "Removed from history",
        description: "This book has been removed from your reading history",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    }
  };

  const completedBooks = history.filter(h => h.completedAt);
  const inProgressBooks = history.filter(h => !h.completedAt && h.progress && h.progress > 0);
  const bookmarkedBooks = history.filter(h => h.isBookmarked);

  const displayedHistory = 
    activeTab === "completed" ? completedBooks :
    activeTab === "in-progress" ? inProgressBooks :
    activeTab === "bookmarked" ? bookmarkedBooks :
    history;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header variant="citizen" />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your reading history...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header variant="citizen" />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <History className="h-8 w-8 text-[#1e3a8a]" />
            <h1 className="text-3xl font-bold text-gray-800">Reading History</h1>
          </div>
          <p className="text-gray-500">Track your reading progress and continue where you left off</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-2 flex-wrap">
          <Button 
            variant={activeTab === "all" ? "default" : "outline"} 
            onClick={() => setActiveTab("all")}
            className={activeTab === "all" ? "bg-[#1e3a8a]" : ""}
          >
            All ({history.length})
          </Button>
          <Button 
            variant={activeTab === "in-progress" ? "default" : "outline"} 
            onClick={() => setActiveTab("in-progress")}
            className={activeTab === "in-progress" ? "bg-[#1e3a8a]" : ""}
          >
            In Progress ({inProgressBooks.length})
          </Button>
          <Button 
            variant={activeTab === "completed" ? "default" : "outline"} 
            onClick={() => setActiveTab("completed")}
            className={activeTab === "completed" ? "bg-[#1e3a8a]" : ""}
          >
            Completed ({completedBooks.length})
          </Button>
          <Button 
            variant={activeTab === "bookmarked" ? "default" : "outline"} 
            onClick={() => setActiveTab("bookmarked")}
            className={activeTab === "bookmarked" ? "bg-[#1e3a8a]" : ""}
          >
            <Bookmark className="h-4 w-4 mr-2" /> Bookmarked ({bookmarkedBooks.length})
          </Button>
        </div>

        {/* History List */}
        {displayedHistory.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-500">No reading history yet</h3>
              <p className="text-gray-400 text-sm">Start reading books to see your progress here</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {displayedHistory.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow" data-testid={`card-history-${item.bookId}`}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    {/* Book Cover Placeholder */}
                    <div className="w-20 h-32 bg-gray-200 rounded flex-shrink-0 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-gray-400" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-800 line-clamp-1" data-testid={`text-book-title-${item.bookId}`}>Book #{item.bookId}</h3>
                            {item.isBookmarked && (
                              <Bookmark className="h-4 w-4 text-[#f97316] fill-current" />
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mb-3">Last read: {new Date(item.lastAccessedAt).toLocaleDateString()}</p>

                          {/* Progress Bar */}
                          {!item.completedAt && item.progress !== null && (
                            <div className="mb-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-medium text-gray-600">Reading Progress</span>
                                <span className="text-xs font-bold text-[#1e3a8a]">{Math.round(item.progress)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-[#1e3a8a] h-2 rounded-full transition-all"
                                  style={{ width: `${item.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}

                          {/* Status Badges */}
                          <div className="flex gap-2 flex-wrap">
                            {item.completedAt && (
                              <Badge className="bg-green-100 text-green-800">✓ Completed</Badge>
                            )}
                            {item.progress && item.progress > 0 && !item.completedAt && (
                              <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
                            )}
                            {item.lastReadPage && (
                              <Badge variant="outline" className="text-xs">Page {item.lastReadPage}</Badge>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button size="sm" className="bg-[#1e3a8a] hover:bg-[#172554]">
                            Continue Reading
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => handleRemoveFromHistory(item.bookId)}
                            data-testid={`button-remove-${item.bookId}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
