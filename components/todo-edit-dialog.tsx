"use client"

import { FC, PropsWithChildren, useRef, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSupabase } from "@/lib/supabase-provider";
import * as DialogPrimitive from "@radix-ui/react-dialog"

interface EditTodoInput {
    title: string
    description: string
}

interface Props extends PropsWithChildren {
    description: string | null
    id: number
    title: string
}

const TodoEditDialog: FC<Props> = ({ children, description: intialDescription, id, title: initialTitle }) => {
    const [title, setTitle] = useState(initialTitle)
    const [description, setDescription] = useState(intialDescription)
    const { supabase } = useSupabase()

    const onSave = async () => {
        await supabase.from("todos").update({
            title, description
        }).eq("id", id)
    }

    return <Dialog>
        {children}

        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Edit todo</DialogTitle>
                <DialogDescription>
                    Make changes to your todo here. Click save when you're done.
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                        Title
                    </Label>
                    <Input id="title" value={title ?? ""} className="col-span-3" onChange={it => setTitle(it.currentTarget.value)} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                        Description
                    </Label>
                    <Input id="description" value={description ?? ""} className="col-span-3" onChange={it => setDescription(it.currentTarget.value)} />
                </div>
            </div>
            <DialogFooter>
                <DialogPrimitive.Close>
                    <Button onClick={onSave}>Save changes</Button>
                </DialogPrimitive.Close>
            </DialogFooter>
        </DialogContent>
    </Dialog>
}

export default TodoEditDialog