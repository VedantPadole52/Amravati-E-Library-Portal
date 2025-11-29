import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Flame, 
  Target, 
  Star, 
  BookmarkPlus, 
  Trophy, 
  Award,
  ArrowLeft
} from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function UserProfile() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [readingGoal, setReadingGoal] = useState(50);
  const [showGoalForm, setShowGoalForm] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const [userRes, streakRes, goalRes, wishlistRes, achievementsRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/user/reading-streak"),
        fetch("/api/user/reading-goal"),
        fetch("/api/user/wishlist"),
        fetch("/api/user/achievements")
      ]);

      const user = userRes.ok ? await userRes.json() : null;
      const streak = streakRes.ok ? await streakRes.json() : { currentStreak: 0, longestStreak: 0 };
      const goal = goalRes.ok ? await goalRes.json() : { targetBooks: 0, booksRead: 0 };
      const wishlist = wishlistRes.ok ? await wishlistRes.json() : { count: 0 };
      const achievements = achievementsRes.ok ? await achievementsRes.json() : { achievements: [] };

      setProfile({ user, streak, goal, wishlist, achievements });
      setReadingGoal(goal.targetBooks || 50);
    } catch (error) {
      console.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const updateReadingGoal = async () => {
    try {
      const response = await fetch("/api/user/reading-goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ targetBooks: readingGoal })
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `Reading goal updated to ${readingGoal} books`
        });
        setShowGoalForm(false);
        loadProfile();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update reading goal"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Header variant="citizen" />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading your profile...</p>
          </div>
        </main>
      </div>
    );
  }

  const goalProgress = profile?.goal?.targetBooks > 0 
    ? Math.round((profile?.goal?.booksRead / profile?.goal?.targetBooks) * 100) 
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header variant="citizen" />

      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => setLocation("/citizen/dashboard")}
          className="mb-6 dark:border-gray-600"
          data-testid="button-back-to-dashboard"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">📚 My Reading Profile</h1>
          <p className="text-blue-100">Track your reading journey and achievements</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Reading Streak Card */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Flame className="h-5 w-5 text-orange-500" /> Reading Streak
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-orange-500">{profile?.streak?.currentStreak || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Days in a row</p>
                  </div>
                  <div className="text-center border-t pt-4 dark:border-gray-700">
                    <p className="text-2xl font-bold text-blue-600">{profile?.streak?.longestStreak || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Best streak ever</p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center pt-2">Keep reading daily to build your streak! 🔥</p>
                </CardContent>
              </Card>

              {/* Books Read Card */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Star className="h-5 w-5 text-yellow-500" /> Books Read
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-yellow-600">{profile?.goal?.booksRead || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">This year</p>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all" 
                      style={{ width: `${goalProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{goalProgress}% of your goal</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Goals Tab */}
          <TabsContent value="goals" className="space-y-4">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Target className="h-5 w-5 text-green-600" /> Reading Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium dark:text-gray-300">Your goal: {profile?.goal?.targetBooks} books</p>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all" 
                      style={{ width: `${goalProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {profile?.goal?.booksRead} of {profile?.goal?.targetBooks} books read ({goalProgress}%)
                  </p>
                </div>

                {!showGoalForm ? (
                  <Button 
                    onClick={() => setShowGoalForm(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    data-testid="button-edit-reading-goal"
                  >
                    Edit Goal
                  </Button>
                ) : (
                  <div className="space-y-3 pt-4 border-t dark:border-gray-700">
                    <input 
                      type="number" 
                      min="1" 
                      max="365"
                      value={readingGoal}
                      onChange={(e) => setReadingGoal(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                      data-testid="input-reading-goal"
                    />
                    <div className="flex gap-2">
                      <Button 
                        onClick={updateReadingGoal}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        data-testid="button-save-reading-goal"
                      >
                        Save
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setShowGoalForm(false)}
                        className="flex-1 dark:border-gray-600"
                        data-testid="button-cancel-reading-goal"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist" className="space-y-4">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <BookmarkPlus className="h-5 w-5 text-pink-600" /> My Wishlist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                  {profile?.wishlist?.count || 0} books saved to read later
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {profile?.achievements?.achievements?.length > 0 ? (
                profile?.achievements?.achievements?.map((achievement: any) => (
                  <Card key={achievement.id} className="dark:bg-gray-800 dark:border-gray-700">
                    <CardContent className="pt-6 text-center">
                      <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                      <h3 className="font-bold dark:text-white">{achievement.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{achievement.description}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        {new Date(achievement.earnedAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-8">
                  <Award className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-600 dark:text-gray-400">No achievements yet. Keep reading to earn badges!</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
