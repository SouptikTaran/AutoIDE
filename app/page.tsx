"use client";
import React from "react";
import UserButton from "@/features/auth/components/user-button";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useSession } from "next-auth/react";

export default function Home() {
  const user = useCurrentUser();
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Welcome to Your Dashboard
          </h1>
          <UserButton />
        </div>
        
        {user && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-200">
              Hello, {user.name}! 👋
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              You're successfully signed in with {user.email}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
              Dashboard
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Your main dashboard content goes here.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
              Analytics
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              View your analytics and insights here.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-slate-200">
              Settings
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your account settings and preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
