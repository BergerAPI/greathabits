"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useSupabase } from "@/lib/supabase-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { supabase } = useSupabase()
    const router = useRouter()

    return (
        <div className="h-full flex flex-col">
            <div className="p-3 border-b border-slate-200 flex justify-between items-center">
                <div className="hidden md:block">
                    <h1>Great Habits</h1>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar>
                            <AvatarImage src="https://github.com/bergerapi.png" alt="@bergerapi" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="/app/settings">Profile</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/app/settings">Setting</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => {
                            await supabase.auth.signOut()
                            router.push("/")
                        }}>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="bg-slate-100 h-full">
                <main className="px-3 lg:px-0 max-w-5xl m-auto">
                    {children}
                </main>
            </div>

        </div>
    )
}
