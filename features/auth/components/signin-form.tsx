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
import { Chrome, Github, Sparkles } from "lucide-react";
import { signIn } from "@/auth";

async function handleGoogleSignIn(){
"use server"
await signIn("google", { redirectTo: "/" })
}

async function handleGithubSignIn(){
"use server"
await signIn("github", { redirectTo: "/" })
}

const SignInFormClient = () => {
  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border bg-white dark:bg-slate-900">
      <CardHeader className="space-y-4 pb-6">
        <div className="flex justify-center mb-2">
          <div className="p-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-slate-900 to-slate-600 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
          Welcome Back
        </CardTitle>
        <CardDescription className="text-center text-slate-600 dark:text-slate-400">
          Sign in to continue your journey
        </CardDescription>
      </CardHeader>

        <CardContent className="space-y-4 px-6">
          <form action={handleGoogleSignIn}>
            <Button 
              type="submit" 
              variant="outline" 
              className="w-full h-11 text-base font-medium border-2 hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-950 dark:hover:border-red-800 transition-all duration-200 group"
            >
              <Chrome className="mr-3 h-5 w-5 text-red-500 group-hover:scale-110 transition-transform duration-200" />
              <span>Continue with Google</span>
            </Button>
          </form>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-3 text-slate-500 dark:text-slate-400 font-medium">
                or
              </span>
            </div>
          </div>
          
          <form action={handleGithubSignIn}>
            <Button 
              type="submit" 
              variant="outline" 
              className="w-full h-11 text-base font-medium border-2 hover:bg-slate-50 hover:border-slate-300 dark:hover:bg-slate-800 dark:hover:border-slate-600 transition-all duration-200 group"
            >
              <Github className="mr-3 h-5 w-5 text-slate-700 dark:text-slate-300 group-hover:scale-110 transition-transform duration-200" />
              <span>Continue with GitHub</span>
            </Button>
          </form>
        </CardContent>

        <CardFooter className="px-6 pt-4">
          <p className="text-xs text-center text-slate-500 dark:text-slate-400 w-full leading-relaxed">
            By signing in, you agree to our{" "}
            <a 
              href="#" 
              className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-600/30 hover:decoration-blue-600 transition-colors duration-200"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a 
              href="#" 
              className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-600/30 hover:decoration-blue-600 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            .
          </p>
        </CardFooter>
      </Card>
  );
};

export default SignInFormClient;