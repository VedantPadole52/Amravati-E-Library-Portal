import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react";

interface PDFViewerProps {
  title: string;
  author: string;
  bookId?: number;
  pdfUrl?: string;
  onClose: () => void;
}

export default function PDFViewer({ title, author, bookId, pdfUrl, onClose }: PDFViewerProps) {
  const [currentPage, setCurrentPage] = useState(1);

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

        <CardContent className="flex-1 overflow-auto bg-gray-100">
          {pdfUrl ? (
            <div className="w-full h-full flex flex-col">
              <object 
                data={pdfUrl}
                type="application/pdf"
                className="flex-1 w-full"
                style={{ minHeight: "500px" }}
              >
                <iframe 
                  src={pdfUrl}
                  className="w-full h-full"
                  style={{ minHeight: "500px", border: "none" }}
                  data-testid="pdf-iframe"
                />
              </object>
              <div className="text-xs text-gray-500 p-2 text-center">
                PDF Viewer - Use your browser's controls to zoom and navigate
              </div>
            </div>
          ) : (
            <div className="p-8 rounded min-h-96 flex items-center justify-center bg-white">
              <p className="text-gray-500 text-center">No PDF available for this book. Admin must upload a PDF file.</p>
            </div>
          )}
        </CardContent>

        <div className="border-t p-4 flex items-center justify-end gap-2">
          {pdfUrl && (
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={() => {
                const element = document.createElement("a");
                element.setAttribute("href", pdfUrl);
                element.setAttribute("download", `${title.replace(/\s+/g, "_")}.pdf`);
                element.style.display = "none";
                document.body.appendChild(element);
                element.click();
                document.body.removeChild(element);
              }}
              data-testid="button-pdf-download"
            >
              <Download className="h-4 w-4" /> Download PDF
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
