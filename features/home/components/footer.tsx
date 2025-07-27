import Link from "next/link";
import { Github as LucideGithub}  from "lucide-react";
import Image from "next/image";

interface ProjectLink {
  href: string | null;
  text: string;
  description: string;
  icon: string;
  iconDark?: string;
  isNew?: boolean;
}

export function Footer() {
  const socialLinks = [
    {
      href: "#",
      icon: <LucideGithub className="w-5 h-5 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors" />,
    },
   
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col items-center space-y-6 text-center">
        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map((link, index) => (
            <Link key={index} href={link.href || "#"} target="_blank" rel="noopener noreferrer">
              {link.icon}
            </Link>
          ))}
        </div>

        {/* Copyright Notice */}
        <p className="text-sm text-gray-600 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Codesnippet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}