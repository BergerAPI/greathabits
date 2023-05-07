"use client";

import { Database } from "@/lib/database";
import { useSupabase } from "@/lib/supabase-provider";
import { FC, useEffect, useMemo, useState } from "react";
import Todo from "./todo";

type Todos = Database['public']['Tables']['todos']['Row']

interface Props {
    initialTodos: Todos[]
}

const TodoView: FC<Props> = ({ initialTodos }) => {
    const [todos, setTodos] = useState<Todos[]>(initialTodos)
    const { supabase } = useSupabase()

    const sortedTodos = useMemo(() => {
        return todos
            .sort((a, b) => a.id - b.id)
            .sort((a, b) => (a.checked === b.checked) ? 0 : a.checked ? -1 : 1)
    }, [todos])

    useEffect(() => {

        // When a new todo is added, edited or deleted
        supabase.channel("todos")
            .on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "todos"
            }, async (payload) => {
                const newTodos = await supabase.from("todos").select()

                setTodos(newTodos.data!!)
            })
            .on("postgres_changes", {
                event: "DELETE",
                schema: "public",
                table: "todos"
            }, async (payload) => {
                const newTodos = await supabase.from("todos").select()

                setTodos(newTodos.data!!)
            })
            .on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "todos",
            }, async (_) => {
                const newTodos = await supabase.from("todos").select()

                setTodos(newTodos.data!!)
            }).subscribe()

        return () => {
            supabase.channel("todos").unsubscribe()
        }
    }, [])

    return <>
        <div className="flex flex-col gap-3">
            {sortedTodos.map(todo => {
                return <Todo
                    checked={todo.checked}
                    description={todo.description}
                    title={todo.title}
                    id={todo.id}
                    key={`${todo.id}`} />
            })}
        </div>
    </>
}

export default TodoView;