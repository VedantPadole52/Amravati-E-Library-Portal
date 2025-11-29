import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookSummaryProps {
  bookId: number;
  summary?: string | null;
  isAdmin?: boolean;
  onSummaryGenerated?: (summary: string) => void;
}

export default function BookSummary({ bookId, summary, isAdmin, onSummaryGenerated }: BookSummaryProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateSummary = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/books/${bookId}/generate-summary`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to generate summary");
      }

      const data = await response.json();
      toast({
        title: "Success",
        description: "AI summary generated successfully!"
      });
      
      if (onSummaryGenerated) {
        onSummaryGenerated(data.summary);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to generate summary"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!summary) {
    if (!isAdmin) {
      return null;
    }

    return (
      <Card className="mt-4 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Sparkles className="h-5 w-5 text-purple-600" />
            AI Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            No AI summary generated yet. Generate one to help users understand the book quickly.
          </p>
          <Button
            onClick={generateSummary}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 w-full"
            data-testid="button-generate-summary"
          >
            {loading ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Generate AI Summary
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4 border-purple-200 dark:border-purple-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Sparkles className="h-5 w-5 text-purple-600" />
          AI Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed" data-testid="text-book-summary">
          {summary}
        </p>
        {isAdmin && (
          <Button
            onClick={generateSummary}
            disabled={loading}
            variant="outline"
            className="mt-4 w-full"
            data-testid="button-regenerate-summary"
          >
            {loading ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Regenerating...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Regenerate Summary
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
