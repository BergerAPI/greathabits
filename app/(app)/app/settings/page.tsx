import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Database } from "@/lib/database"
import { useSupabase } from "@/lib/supabase-provider"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import { FC, PropsWithChildren } from "react"

interface SettingsSectionProps {
    title: string
    description: string
}

const SettingsSection: FC<SettingsSectionProps & PropsWithChildren> = ({ title, description, children }) => {
    return <>
        <div className="flex flex-col gap-3">
            <div>
                <h1 className="scroll-m-20 text-2xl font-medium tracking-tight">{title}</h1>
                <p className="text-slate-500 dark:text-slate-400">{description}</p>
            </div>

            <Separator />

            <div>
                {children}
            </div>
        </div>
    </>
}

const Settings = async () => {
    const supabase = createServerComponentSupabaseClient<Database>({ headers, cookies })
    const user = await supabase.auth.getUser()

    return <>
        <div className="space-y-12">
            <SettingsSection title="Settings" description="Change information about your account.">
                <form className="space-y-3">
                    <div>
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" className="flex-1" placeholder="Enter your first name" />
                    </div>

                    <Button type="submit">Save Changes</Button>
                </form>
            </SettingsSection>

            <SettingsSection title="Danger" description="These settings are not reversible">
                <Button variant="destructive">Delete Your Account</Button >
            </SettingsSection>
        </div>
    </>
}

export default Settings