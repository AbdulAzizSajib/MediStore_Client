"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";

import { Roles } from "@/src/constants/roles";
import { toast } from "@/src/hooks/use-toast";

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(Roles.CUSTOMER);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        role,
        password,
      });
      setIsLoading(false);
      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        console.log("Error during registration:", error.message);
      } else {
        console.log("Registration successful:", data);
        toast({
          title: "Registration successful",
          description: "Please login with your credentials",
        });
        router.push("/login");
        router.refresh();
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-card rounded-lg border border-border shadow-lg">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground">Create Account</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Sign up for a MediStore account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground font-medium">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 h-11 border-border focus:border-primary"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-11 border-border focus:border-primary"
              required
            />
          </div>
        </div>
        {/* Role Field */}
        <div className="space-y-2">
          <Label htmlFor="role" className="text-foreground font-medium">
            Role
          </Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="h-11 border-border focus:border-primary">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Roles.CUSTOMER}>Customer</SelectItem>
              <SelectItem value={Roles.SELLER}>Seller</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground font-medium">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 h-11 border-border focus:border-primary"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Sign Up Button */}
        <Button
          type="submit"
          className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              Creating account...
            </div>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>

      {/* Login Link */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary hover:text-primary/80 font-medium hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
