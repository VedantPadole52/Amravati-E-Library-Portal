import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, Mail, Phone, Calendar, ArrowLeft, Search, Ban, Check, Download, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  isBlocked?: boolean;
  createdAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"name" | "date" | "status">("date");
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) throw new Error("Failed to load users");
      const data = await response.json();
      const sorted = sortUsersList(data.users || [], sortBy);
      setUsers(sorted);
      setFilteredUsers(sorted);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to load users",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sortUsersList = (userList: User[], sortType: string) => {
    const sorted = [...userList];
    if (sortType === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "date") {
      sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortType === "status") {
      sorted.sort((a, b) => {
        if (a.isBlocked === b.isBlocked) return 0;
        return a.isBlocked ? 1 : -1;
      });
    }
    return sorted;
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(u =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  const handleBlockUser = async (userId: string, shouldBlock: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/block`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blocked: shouldBlock })
      });
      if (!response.ok) throw new Error("Failed to update user");
      
      const updatedUser = await response.json();
      const newUsers = users.map(u => u.id === userId ? updatedUser : u);
      setUsers(newUsers);
      setFilteredUsers(newUsers.filter(u => 
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        !searchQuery.trim()
      ));
      
      toast({
        title: "Success",
        description: shouldBlock ? "User blocked successfully" : "User unblocked successfully"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };

  const downloadUsersPDF = async () => {
    try {
      const response = await fetch("/api/admin/users/export/pdf");
      if (!response.ok) throw new Error("Failed to download PDF");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `users-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: "User data downloaded as PDF"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };

  const downloadUsersExcel = async () => {
    try {
      const response = await fetch("/api/admin/users/export/excel");
      if (!response.ok) throw new Error("Failed to download Excel");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `users-${new Date().toISOString().split('T')[0]}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: "User data downloaded as Excel"
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header variant="admin" />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLocation("/admin/dashboard")}
                className="gap-2"
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mt-4 flex items-center gap-2">
              <Users className="h-8 w-8 text-[#0A346F]" /> User Management
            </h1>
            <p className="text-gray-600 mt-2">Total users: {users.length}</p>
          </div>
        </div>

        {/* Search & Sort & Export */}
        <Card className="mb-6">
          <CardContent className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                data-testid="input-search-users"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button 
                variant={sortBy === "date" ? "default" : "outline"}
                size="sm"
                onClick={() => { setSortBy("date"); setFilteredUsers(sortUsersList(users, "date")); }}
                data-testid="button-sort-date"
              >
                Sort by Date
              </Button>
              <Button 
                variant={sortBy === "name" ? "default" : "outline"}
                size="sm"
                onClick={() => { setSortBy("name"); setFilteredUsers(sortUsersList(users, "name")); }}
                data-testid="button-sort-name"
              >
                Sort by Name
              </Button>
              <Button 
                variant={sortBy === "status" ? "default" : "outline"}
                size="sm"
                onClick={() => { setSortBy("status"); setFilteredUsers(sortUsersList(users, "status")); }}
                data-testid="button-sort-status"
              >
                Sort by Status
              </Button>
              
              <div className="ml-auto flex gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={downloadUsersPDF}
                  className="gap-2"
                  data-testid="button-download-users-pdf"
                >
                  <FileText className="h-4 w-4" /> PDF
                </Button>
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={downloadUsersExcel}
                  className="gap-2"
                  data-testid="button-download-users-excel"
                >
                  <Download className="h-4 w-4" /> Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Registered Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">Loading users...</div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No users found</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Phone</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Role</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Joined</th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, idx) => (
                      <tr key={user.id} className={`border-b hover:bg-gray-50 ${user.isBlocked ? "bg-red-50" : ""}`} data-testid={`row-user-${idx}`}>
                        <td className="px-4 py-3 text-gray-800 font-medium">{user.name}</td>
                        <td className="px-4 py-3 text-gray-600 flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          {user.email}
                        </td>
                        <td className="px-4 py-3 text-gray-600 flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          {user.phone || "—"}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.role === 'admin' 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.isBlocked
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {user.isBlocked ? "🔒 Blocked" : "✓ Active"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <Button
                            size="sm"
                            variant={user.isBlocked ? "default" : "destructive"}
                            onClick={() => handleBlockUser(user.id, !user.isBlocked)}
                            className="gap-1 text-xs"
                            data-testid={`button-toggle-block-${user.id}`}
                          >
                            {user.isBlocked ? (
                              <>
                                <Check className="h-3 w-3" /> Unblock
                              </>
                            ) : (
                              <>
                                <Ban className="h-3 w-3" /> Block
                              </>
                            )}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
