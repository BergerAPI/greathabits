import TodoView from "@/components/todo-view"
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

    if (todos.data === null)
        return redirect("/")

    return <>
        <div>
            <TodoView initialTodos={todos.data} />
        </div>

        <Button>Add Todo</Button>
    </>
}

export default App;