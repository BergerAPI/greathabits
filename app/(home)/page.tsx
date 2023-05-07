import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: 'Just another todo software',
  description: "No, really. There isn't much to it. I just wanted to try out supabase and NextJS 13's App-Directory"
};

export default function Home() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="flex flex-col items-center gap-7">
        <h1 className="text-7xl font-bold tracking-tight">Just another <span className="text-blue-400">todo</span> software</h1>
        <p className="text-xl">No, really. There isn't much to it. I just wanted to try out supabase and NextJS 13's App-Directory</p>

        <Link href="auth/signin">
          <Button>
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  )
}
