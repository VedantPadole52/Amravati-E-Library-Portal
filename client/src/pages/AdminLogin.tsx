
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, ShieldAlert, User, Key } from "lucide-react";

// Assets from the reference HTML
const EMBLEM_URL = "https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg";
const DIGITAL_INDIA_URL = "https://upload.wikimedia.org/wikipedia/en/9/95/Digital_India_logo.svg";
const BG_IMAGE_URL = "https://upload.wikimedia.org/wikipedia/commons/2/23/Inside_the_Chhatrapati_Shivaji_Maharaj_Vastu_Sangrahalaya.jpg";

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/admin/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative font-sans overflow-hidden">
      {/* Background with Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${BG_IMAGE_URL})` }}
      >
        {/* Blue overlay similar to reference --gov-blue (#1e3a8a) with opacity */}
        <div className="absolute inset-0 bg-blue-900/85 mix-blend-multiply"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px] animate-in fade-in zoom-in duration-500 mx-4">
        
        {/* Left Side: Branding (Similar to reference) */}
        <div className="w-full md:w-1/2 bg-gray-50 p-8 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-gray-200 relative overflow-hidden">
          {/* Decorative top border using the "Gov Orange" color */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#f97316]"></div>
          
          <img src={EMBLEM_URL} alt="Satyamev Jayate" className="h-24 mb-6 drop-shadow-sm" />
          
          <h1 className="text-2xl font-serif font-bold text-blue-900 mb-2">
            Amravati Municipal Corporation
          </h1>
          <h2 className="text-xl font-medium text-[#f97316] mb-6 uppercase tracking-wide">
            E-Library Admin Portal
          </h2>
          
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed mb-8">
            Restricted access for authorized department personnel only. 
            Secure gateway for managing digital assets and user records.
          </p>

          <div className="mt-auto flex flex-col items-center gap-4">
             <div className="text-xs text-gray-400 font-medium">
                <p>Government of Maharashtra</p>
                <p>Department of Education</p>
            </div>
            <img src={DIGITAL_INDIA_URL} alt="Digital India" className="h-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-300" />
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
          <div className="absolute top-4 right-4">
            <Link href="/">
               <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-blue-900">
                 ← Back to Public Portal
               </Button>
            </Link>
          </div>

          <div className="mb-8">
             <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
               <Lock className="h-6 w-6 text-[#f97316]" /> Admin Login
             </h3>
             <p className="text-sm text-gray-500 mt-1">Please enter your official credentials.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold text-gray-500 uppercase">Official Email / ID</Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@amc.gov.in" 
                  className="pl-9 border-gray-300 focus-visible:ring-blue-900 focus-visible:border-blue-900 transition-all" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-bold text-gray-500 uppercase">Secure Password</Label>
              <div className="relative">
                <Key className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-9 border-gray-300 focus-visible:ring-blue-900 focus-visible:border-blue-900 transition-all" 
                  required 
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300 text-blue-900 focus:ring-blue-900" />
                Remember this device
              </label>
              <a href="#" className="text-blue-900 font-bold hover:underline">Forgot Password?</a>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-6 rounded shadow-lg transition-all transform hover:-translate-y-0.5"
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Access Dashboard"}
            </Button>
          </form>

          <div className="mt-8 p-3 bg-blue-50 border border-blue-100 rounded flex gap-3 items-start">
             <ShieldAlert className="h-5 w-5 text-blue-800 shrink-0 mt-0.5" />
             <div className="text-xs text-blue-800">
                <strong>Security Notice:</strong> Unauthorized access is a punishable offense under the IT Act, 2000. All login attempts are monitored.
             </div>
          </div>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="absolute bottom-4 text-white/50 text-xs text-center w-full">
        &copy; 2024 Amravati Municipal Corporation. All Rights Reserved.
      </div>
    </div>
  );
}
