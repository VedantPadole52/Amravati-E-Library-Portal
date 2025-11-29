import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bell, 
  Plus, 
  Trash2, 
  Home as HomeIcon 
} from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const response = await fetch("/api/announcements");
      if (response.ok) {
        const data = await response.json();
        setAnnouncements(data.announcements || []);
      }
    } catch (error) {
      console.error("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  const handleAddAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast({ variant: "destructive", description: "Please fill all fields" });
      return;
    }

    try {
      const response = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setAnnouncements([data.announcement, ...announcements]);
        setFormData({ title: "", content: "" });
        setIsAdding(false);
        toast({ title: "Success", description: "Announcement posted!" });
      }
    } catch (error) {
      toast({ variant: "destructive", description: "Failed to post announcement" });
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this announcement?")) return;
    try {
      await fetch(`/api/announcements/${id}`, { method: "DELETE" });
      setAnnouncements(announcements.filter(a => a.id !== id));
      toast({ title: "Success", description: "Announcement deleted" });
    } catch (error) {
      toast({ variant: "destructive", description: "Failed to delete" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <Header variant="admin" />

      <div className="flex flex-1">
        <aside className="w-64 bg-primary dark:bg-gray-800 text-white hidden md:block p-4">
          <div className="mb-8 px-2">
             <h2 className="text-xs uppercase tracking-wider text-white/50 font-bold mb-2">Announcements</h2>
             <nav className="space-y-1">
               <Button 
                 variant="secondary" 
                 className="w-full justify-start bg-white/10 text-white hover:bg-white/20 border-none"
               >
                 <Bell className="mr-2 h-4 w-4" /> Post Announcements
               </Button>
               <Button 
                 variant="ghost" 
                 className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
                 onClick={() => setLocation("/admin/dashboard")}
               >
                 <HomeIcon className="mr-2 h-4 w-4" /> Back to Dashboard
               </Button>
             </nav>
          </div>
        </aside>

        <main className="flex-1 p-6 overflow-y-auto">
          <div className="mb-6 flex justify-between items-start">
             <div>
               <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Post Announcements</h1>
               <p className="text-sm text-muted-foreground">Share latest notices with citizens</p>
             </div>
             <Button 
               onClick={() => setIsAdding(!isAdding)}
               className="bg-primary"
             >
               <Plus className="mr-2 h-4 w-4" /> New Announcement
             </Button>
          </div>

          {isAdding && (
            <Card className="mb-6 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
              <CardHeader>
                <CardTitle>Create New Announcement</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddAnnouncement} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      placeholder="Announcement title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                      data-testid="input-announcement-title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      placeholder="Announcement content"
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      required
                      rows={5}
                      data-testid="input-announcement-content"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                    <Button type="submit" className="bg-primary">Post Announcement</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-gray-600 dark:text-gray-400">Loading announcements...</div>
            ) : announcements.length === 0 ? (
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="text-center py-12">
                  <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No announcements yet</p>
                </CardContent>
              </Card>
            ) : (
              announcements.map(announcement => (
                <Card key={announcement.id} className="dark:bg-gray-800 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{announcement.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{announcement.content}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
                          {new Date(announcement.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(announcement.id)}
                        data-testid={`button-delete-announcement-${announcement.id}`}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
