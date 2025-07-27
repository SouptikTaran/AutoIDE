import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Chrome, Github, Code2, Shield, ArrowRight } from "lucide-react";
import { signIn } from "@/auth";
import Link from "next/link";

async function handleGoogleSignIn() {
  "use server"
  await signIn("google", { redirectTo: "/dashboard" })
}

async function handleGithubSignIn() {
  "use server"
  await signIn("github", { redirectTo: "/dashboard" })
}

const SignInFormClient = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Gradient Accents */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-200/20 to-pink-200/20 dark:from-purple-900/10 dark:to-pink-900/10 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md">
        {/* Branding Header */}


        <Card className="w-full shadow-2xl border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
          <CardHeader className="space-y-4 pb-8 pt-8">
            <CardTitle className="text-3xl font-bold text-center text-gray-900 dark:text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400 text-lg">
              Sign in to access your development workspace
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 px-8 ">
            {/* Google Sign In */}
            <form action={handleGoogleSignIn}>
              <Button 
                type="submit" 
                variant="outline" 
                className="w-full h-12 text-base font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-red-300 dark:hover:border-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-50/50 to-orange-50/50 dark:from-red-950/20 dark:to-orange-950/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <Chrome className="mr-3 h-5 w-5 text-red-500 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <span className="relative z-10 text-center">Continue with Google</span>
                <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10" />
              </Button>
            </form>
            
            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200 dark:border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm uppercase">
                <span className="bg-white dark:bg-slate-900 px-4 text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                  or continue with
                </span>
              </div>
            </div>
            
            {/* GitHub Sign In */}
            <form action={handleGithubSignIn}>
              <Button 
                type="submit" 
                variant="outline" 
                className="w-full h-12 text-base font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-slate-50/50 dark:from-gray-800/20 dark:to-slate-800/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <Github className="mr-3 h-5 w-5 text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                <span className="relative z-10">Continue with GitHub</span>
                <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 relative z-10" />
              </Button>
            </form>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span>Secure</span>
              </div>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>50K+ Developers</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="px-8 pt-6 pb-8">
            <div className="w-full space-y-4">
              {/* Terms */}
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 leading-relaxed">
                By signing in, you agree to our{" "}
                <Link 
                  href="/terms" 
                  className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-600/30 hover:decoration-blue-600 transition-colors duration-200"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link 
                  href="/privacy" 
                  className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-600/30 hover:decoration-blue-600 transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              {/* Back to Home */}
              <div className="text-center">
                <Link 
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200 group"
                >
                  <ArrowRight className="h-3 w-3 rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
                  Back to Home
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            New to VibeCode?{" "}
            <Link 
              href="/features"
              className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Explore our features
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInFormClient;