import { UserRole } from "@prisma/client";
import NextAuth , {type DefaultSession} from "next-auth"


export type ExtendedUser = DefaultSession["user"] & {
    role:UserRole
}

declare module "next-auth"{
    interface Session{
        user:ExtendedUser
        accessToken?: string
    }
}

import {JWT} from "next-auth/jwt";


declare module "next-auth/jwt"{
    interface JWT{
        role:UserRole;
        accessToken?: string;
    }
}