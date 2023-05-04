"use client"

import { Database } from "@/lib/database";
import { Checkbox } from "./ui/checkbox";
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import { useSupabase } from "@/lib/supabase-provider";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "./ui/context-menu";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

type Todos = Database['public']['Tables']['todos']['Row']

interface Props {
    checked: boolean
    description: string | null
    id: number
    title: string
}

const TodoText: FC<{
    description: string | null
    htmlFor: string
    title: string
}> = ({ title, description, htmlFor }) => {

    if (description !== null)
        return <div className="grid gap-1.5 leading-none">
            <Label
                htmlFor={htmlFor}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
                {title}
            </Label>

            <p className="text-sm text-muted-foreground">
                {description}
            </p>
        </div>


    return <Label
        htmlFor={htmlFor}
        className="text-sm font-medium text-center peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
        {title}
    </Label>

}

const Todo: FC<Props> = ({ checked, id, title, description }) => {
    const { supabase } = useSupabase()

    // Updating the database when the user toggles the completed state
    const onToggle = async () => {
        await supabase
            .from("todos")
            .update({ checked: !checked })
            .eq('id', id)
    }

    // Updating the database when the user deletes the todo
    const onDelete = async () => {
        await supabase
            .from("todos")
            .delete()
            .eq('id', id)
    }

    return <>
        <ContextMenu>
            <ContextMenuTrigger>
                <div className="flex rounded-md bg-white p-3">
                    <div className={cn("flex space-x-2", description === null ? "items-center" : "items-top")}>
                        <Checkbox id={`${id}`} checked={checked} onClick={onToggle} />
                        <TodoText htmlFor={`${id}`} description={description} title={title} />
                    </div>
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={onToggle}>Toggle</ContextMenuItem>
                <ContextMenuItem onClick={onDelete}>Delete</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    </>
}

export default Todo;