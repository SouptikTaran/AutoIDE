"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Code2, Shield, Zap, Users, CheckCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const features = [
    { icon: Code2, text: "IntelliSense", description: "Advanced code completion" },
    { icon: Zap, text: "Performance", description: "Optimized for speed" },
    { icon: Shield, text: "Security", description: "Enterprise-grade protection" },
    { icon: Users, text: "Collaboration", description: "Team-focused workflow" }
  ];

  const benefits = [
    "Increase development productivity by 40%",
    "Reduce debugging time with AI assistance",
    "Seamless team collaboration tools",
    "Enterprise security compliance"
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-slate-950">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Subtle gradient accents */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-950/20 dark:to-transparent" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-l from-indigo-50/30 to-transparent dark:from-indigo-950/10 dark:to-transparent rounded-full blur-3xl" />
      
      <div className="relative z-20 flex flex-col items-center justify-start min-h-screen py-16 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          {/* Professional logo */}
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-lg">
            <Code2 className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white tracking-tight leading-tight mb-6">
            Professional Code Editor
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Built for Teams
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            VibeCode Editor delivers enterprise-grade development tools with intelligent features, 
            robust security, and seamless collaboration capabilities for modern development teams.
          </p>
          
          {/* Trust indicators */}
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-12">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span>SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <span>50,000+ Developers</span>
            </div>
          </div>
        </div>

        {/* Key Benefits */}
        <div className="w-full mb-16 animate-fade-in-up animation-delay-300">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-6 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                    <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{feature.text}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Value Proposition */}
        <div className="w-full max-w-4xl mb-16 animate-fade-in-up animation-delay-500">
          <div className="bg-gray-50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Why Development Teams Choose VibeCode
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center animate-fade-in-up animation-delay-700">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/dashboard">
              <Button 
                className="px-8 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                Start Free Trial
                <ArrowUpRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="px-8 py-3 text-lg font-medium border-2 border-gray-300 dark:border-gray-700 hover:border-blue-600 dark:hover:border-blue-400 rounded-lg transition-all duration-300"
              size="lg"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Free 14-day trial • No credit card required • Full feature access
          </p>
        </div>

        {/* Social Proof */}
        <div className="w-full mt-20 animate-fade-in-up animation-delay-900">
          <div className="text-center mb-8">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Trusted by industry leaders
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 dark:opacity-40">
            {/* Placeholder for company logos */}
            <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-8 w-28 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-8 w-22 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-8 w-26 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="w-full mt-16 animate-fade-in-up animation-delay-1100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50K+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Developers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-600 dark:text-gray-400">Uptime SLA</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">40%</div>
              <div className="text-gray-600 dark:text-gray-400">Productivity Increase</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }

        .animation-delay-700 {
          animation-delay: 700ms;
        }

        .animation-delay-900 {
          animation-delay: 900ms;
        }

        .animation-delay-1100 {
          animation-delay: 1100ms;
        }
      `}</style>
    </div>
  );
}