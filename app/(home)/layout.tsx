"use client"

import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="h-screen flex flex-col">
            <div className="p-3 border-b border-slate-100 flex justify-between items-center">
                <div className="hidden md:block">
                    <h1>Great Habits</h1>
                </div>

                <div className="flex gap-1">
                    <Link href="/auth/signin">
                        <Button variant="ghost">Sign In</Button>
                    </Link>

                    <Link href="/auth/signup">
                        <Button variant="default">Sign Up</Button>
                    </Link>
                </div>
            </div>

            {children}
        </main>
    )
}
