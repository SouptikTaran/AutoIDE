"use client";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toogle";
import UserButton from "@/features/auth/components/user-button";
import { Button } from "@/components/ui/button";
import { Menu, X, ExternalLink } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/docs/components/background-paths", label: "Documentation" },
    { href: "/examples", label: "Examples" },
    { href: "/community", label: "Community" },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity group"
              >
                <div className="relative">
                  {/* <Image
                    src="/logo.svg"
                    alt="VibeCode Editor Logo"
                    height={40}
                    width={40}
                    className="group-hover:scale-105 transition-transform duration-200"
                  /> */}
                </div>
                <div className="hidden sm:block">
                  <span className="font-bold text-xl text-blue-700 dark:text-blue-400">
                    AutoIDE
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                    Editor
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              {/* <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm font-medium text-blue-700 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-200" />
                  </Link>
                ))}
                
                <Link
                  href="https://api.vibecode.dev"
                  target="_blank"
                  className="flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200 group"
                >
                  API
                  <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded-full font-medium">
                    New
                  </span>
                </Link>
              </nav> */}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-4">
                <Link href="/pricing">
                  <Button variant="ghost" size="sm" className="font-medium">
                    Pricing
                  </Button>
                </Link>
                
                <Link href="/dashboard">
                  <Button size="sm" className="font-medium bg-blue-600 hover:bg-blue-700 text-white">
                    Get Started
                  </Button>
                </Link>
                
                <div className="w-px h-6 bg-gray-200 dark:bg-slate-800" />
                
                <ThemeToggle />
                <UserButton />
              </div>

              {/* Mobile Actions */}
              <div className="flex lg:hidden items-center gap-3">
                <ThemeToggle />
                <UserButton />
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl">
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-base font-medium text-blue-700 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                
                <Link
                  href="https://api.vibecode.dev"
                  target="_blank"
                  className="flex items-center gap-2 text-base font-medium text-blue-700 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  API
                  <ExternalLink className="w-4 h-4 opacity-50" />
                  <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs px-2 py-0.5 rounded-full font-medium">
                    New
                  </span>
                </Link>
                
                <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-slate-800">
                  <Link href="/pricing" className="block w-full">
                    <Button variant="ghost" className="w-full justify-start font-medium">
                      Pricing
                    </Button>
                  </Link>
                  
                  <Link href="/dashboard" className="block w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium">
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}