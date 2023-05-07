"use client"

import { Database } from "@/lib/database";
import { Checkbox } from "./ui/checkbox";
import { FC, useState } from "react";
import { useSupabase } from "@/lib/supabase-provider";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "./ui/context-menu";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Edit, ToggleLeft, Trash } from "lucide-react";
import { DialogTrigger } from "./ui/dialog";
import TodoEditDialog from "./todo-edit-dialog";

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

    return <div className="grid gap-1.5 leading-none">
        <Label
            htmlFor={htmlFor}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
            {title}
        </Label>

        {description !== null && <p className="text-sm text-muted-foreground">
            {description}
        </p>}
    </div>
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
        <TodoEditDialog
            id={id}
            description={description}
            title={title}
        >
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="rounded-md bg-white p-3 drop-shadow-sm">
                        <div className={"flex space-x-2"}>
                            <Checkbox id={`${id}`} checked={checked} onClick={onToggle} />
                            <TodoText htmlFor={`${id}`} description={description} title={title} />
                        </div>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <DialogTrigger className="w-full">
                        <ContextMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </ContextMenuItem>
                    </DialogTrigger>

                    <ContextMenuItem onClick={onToggle}>
                        <ToggleLeft className="mr-2 h-4 w-4" />
                        Toggle
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={onDelete} className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </TodoEditDialog>
    </>
}

export default Todo;
