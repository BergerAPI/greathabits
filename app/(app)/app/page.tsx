import { Button } from "@/components/ui/button"
import { Database } from "@/lib/database"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

const App = async () => {
    const supabase = createServerComponentSupabaseClient<Database>({ headers, cookies })
    const user = await supabase.auth.getUser()

    if (user.data.user === null)
        return redirect("/auth/signin")

    const todos = await supabase.from("todos").select("*")

    return <>
        <div>
            {todos.data?.map(todo => <div>
                <p>{todo.title}</p>
                <p>{todo.description}</p>
            </div>)}
        </div>

        <Button>Add Todo</Button>
    </>
}

export default App;