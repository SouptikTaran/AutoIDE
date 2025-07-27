import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import type { NextAuthConfig } from "next-auth"

export default {
    providers: [
        Github({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
            authorization: { 
                params: { 
                    scope: 'read:user user:email repo' 
                } 
            },
            profile(profile, tokens) {
                return {
                    id: String(profile.id), 
                    name: profile.name || profile.login,
                    email: profile.email || `${profile.login}@github.local`, // Fallback for private emails
                    image: profile.avatar_url,
                };
            },
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ]
}