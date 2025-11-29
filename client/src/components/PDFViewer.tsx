import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react";

interface PDFViewerProps {
  title: string;
  author: string;
  bookId?: number;
  onClose: () => void;
}

export default function PDFViewer({ title, author, bookId, onClose }: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 50; // Dummy PDF has 50 pages

  // Track reading activity
  useEffect(() => {
    if (bookId) {
      fetch("/api/reading-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, progress: 10 })
      }).catch(() => {});
    }
  }, [bookId]);

  // Dummy PDF content pages
  const dummyPages = Array.from({ length: totalPages }, (_, i) => `
    Chapter ${Math.floor(i / 10) + 1}
    
    Page ${i + 1}
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
    
    ${i % 5 === 0 ? "Section Break: " + ["Introduction", "Development", "Conclusion", "References", "Appendix"][Math.floor(i / 10)] : ""}
    
    This is dummy content for demonstration purposes. In a real application,
    this would display actual PDF content using a library like react-pdf.
    
    Content continues here with more text...
  `);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-3xl max-h-[90vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">by {author}</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            data-testid="button-close-pdf"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex-1 overflow-auto">
          <div className="bg-gray-100 p-8 rounded min-h-96 whitespace-pre-wrap text-sm leading-relaxed">
            {dummyPages[currentPage - 1]}
          </div>
        </CardContent>

        <div className="border-t p-4 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="gap-2"
            data-testid="button-pdf-prev"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>

          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">
              Page <input 
                type="number" 
                value={currentPage}
                onChange={(e) => setCurrentPage(Math.min(totalPages, Math.max(1, parseInt(e.target.value) || 1)))}
                className="w-12 px-2 py-1 border rounded"
                min="1"
                max={totalPages}
                data-testid="input-pdf-page"
              /> of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                const element = document.createElement("a");
                element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(dummyPages.join("\n\n")));
                element.setAttribute("download", `${title.replace(/\s+/g, "_")}.txt`);
                element.style.display = "none";
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              data-testid="button-pdf-download"
            >
              <Download className="h-4 w-4" /> Download
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="gap-2"
            data-testid="button-pdf-next"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
