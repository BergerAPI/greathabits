import AddTodo from "@/components/add-todo"
import TodoView from "@/components/todo-view"
import { Database } from "@/lib/database"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

export const metadata = {
    title: 'Greathabits',
    description: "Please sign in to get some work done!"
};

const App = async () => {
    const supabase = createServerComponentSupabaseClient<Database>({ headers, cookies })
    const user = await supabase.auth.getUser()

    if (user.data.user === null)
        return redirect("/auth/signin")

    const todos = await supabase.from("todos").select("*")

    if (todos.data === null)
        return redirect("/")

    return <div className="space-y-8">
        <div>
            <h1 className="scroll-m-20 text-2xl font-medium tracking-tight">Welcome back</h1>
            <p className="text-slate-500 dark:text-slate-400">Get to work and complete some todos!</p>
        </div>

        <div className="space-y-4">
            <AddTodo />
            <TodoView initialTodos={todos.data} />
        </div>
    </div>
}

export default App;