import AuthForm from "@/components/auth-form";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SignUp() {
    const supabase = createServerComponentSupabaseClient({ headers, cookies })
    const user = await supabase.auth.getUser()

    if (user.data.user !== null)
        return redirect("/app")

    return (
        <div className="w-[350px] grid gap-5">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                    Hey there!
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    Enter your email to create a new account
                </p>
            </div>

            <AuthForm />

            <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                <Link href="/auth/signin">Already have an account?</Link>
            </div>
        </div>
    )
}
