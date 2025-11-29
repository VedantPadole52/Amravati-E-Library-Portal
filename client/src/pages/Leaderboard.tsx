import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Flame, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface Reader {
  userId: string;
  name: string;
  booksRead?: number;
  currentStreak?: number;
  longestStreak?: number;
  reviewCount?: number;
}

export default function Leaderboard() {
  const [topReaders, setTopReaders] = useState<Reader[]>([]);
  const [streakLeaders, setStreakLeaders] = useState<Reader[]>([]);
  const [mostReviewers, setMostReviewers] = useState<Reader[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    loadLeaderboards();
  }, []);

  const loadLeaderboards = async () => {
    try {
      const [readers, streaks, reviewers] = await Promise.all([
        fetch("/api/leaderboard/top-readers").then(r => r.json()),
        fetch("/api/leaderboard/streak-leaders").then(r => r.json()),
        fetch("/api/leaderboard/most-reviewers").then(r => r.json()),
      ]);
      
      setTopReaders(readers.data || []);
      setStreakLeaders(streaks.data || []);
      setMostReviewers(reviewers.data || []);
    } catch (error) {
      console.error("Failed to load leaderboards", error);
    } finally {
      setIsLoading(false);
    }
  };

  const MedalBadge = ({ position }: { position: number }) => {
    const medals = ["🥇", "🥈", "🥉"];
    return <span className="text-xl">{medals[position] || `${position + 1}#`}</span>;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <Header variant="citizen" />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocation("/citizen/dashboard")}
            className="gap-2 mb-4"
            data-testid="button-back-to-dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <Trophy className="h-10 w-10 text-yellow-500" /> Leaderboards
          </h1>
          <p className="text-gray-600 mt-2">Compete with other readers in our community</p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">Loading leaderboards...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Readers */}
            <Card className="border-2 border-yellow-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b-2 border-yellow-200">
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-yellow-600" />
                  Top Readers
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Most books completed</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {topReaders.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No data yet</div>
                  ) : (
                    topReaders.map((reader, idx) => (
                      <div
                        key={reader.userId}
                        className="px-6 py-4 border-b last:border-0 hover:bg-yellow-50 transition-colors flex items-center justify-between"
                        data-testid={`row-top-reader-${idx}`}
                      >
                        <div className="flex items-center gap-3">
                          <MedalBadge position={idx} />
                          <div>
                            <p className="font-semibold text-gray-800">{reader.name}</p>
                            <p className="text-xs text-gray-500">Books read</p>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-yellow-600">{reader.booksRead}</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Streak Leaders */}
            <Card className="border-2 border-red-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b-2 border-red-200">
                <CardTitle className="flex items-center gap-2">
                  <Flame className="h-6 w-6 text-red-600" />
                  Streak Leaders
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Longest reading streak</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {streakLeaders.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No data yet</div>
                  ) : (
                    streakLeaders.map((reader, idx) => (
                      <div
                        key={reader.userId}
                        className="px-6 py-4 border-b last:border-0 hover:bg-red-50 transition-colors flex items-center justify-between"
                        data-testid={`row-streak-leader-${idx}`}
                      >
                        <div className="flex items-center gap-3">
                          <MedalBadge position={idx} />
                          <div>
                            <p className="font-semibold text-gray-800">{reader.name}</p>
                            <p className="text-xs text-gray-500">Current: {reader.currentStreak} days</p>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-red-600">{reader.longestStreak}d</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Most Reviewers */}
            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-200">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-6 w-6 text-blue-600" />
                  Most Reviewers
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Book reviews written</p>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {mostReviewers.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No data yet</div>
                  ) : (
                    mostReviewers.map((reader, idx) => (
                      <div
                        key={reader.userId}
                        className="px-6 py-4 border-b last:border-0 hover:bg-blue-50 transition-colors flex items-center justify-between"
                        data-testid={`row-top-reviewer-${idx}`}
                      >
                        <div className="flex items-center gap-3">
                          <MedalBadge position={idx} />
                          <div>
                            <p className="font-semibold text-gray-800">{reader.name}</p>
                            <p className="text-xs text-gray-500">Reviews</p>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-blue-600">{reader.reviewCount}</span>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
