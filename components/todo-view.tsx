"use client";

import { Database } from "@/lib/database";
import { useSupabase } from "@/lib/supabase-provider";
import { FC, useEffect, useState } from "react";

type Todos = Database['public']['Tables']['todos']['Row']

interface Props {
    initialTodos: Todos[]
}

const TodoView: FC<Props> = ({ initialTodos }) => {
    const [todos, setTodos] = useState<Todos[]>(initialTodos)
    const { supabase } = useSupabase()

    useEffect(() => {
        supabase.channel("todos").on("postgres_changes", {
            event: "INSERT",
            schema: "public",
            table: "todos"
        }, (payload) => {
            setTodos([...todos, payload.new as Todos])
        }).subscribe()

    }, [])

    return <>
        {todos.map(todo => {
            return <div key={todo.id}>
                <p>{todo.title}</p>
                <p>{todo.description}</p>
            </div>
        })}
    </>
}

export default TodoView;