"use client";

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useSupabase } from "@/lib/supabase-provider"
import { useRouter } from "next/navigation";
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
    const { supabase } = useSupabase()
    const { push } = useRouter()

    return <>
        <div className="space-y-12">
            <SettingsSection title="Danger" description="These settings are not reversible">
                <Button variant="destructive" onClick={async () => {
                    await supabase.rpc("deleteUser")
                    await supabase.auth.signOut()
                    push("/")
                }}>Delete Your Account</Button>
            </SettingsSection>
        </div>
    </>
}

export default Settings