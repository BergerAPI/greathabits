"use client";

import { useSupabase } from "@/lib/supabase-provider";
import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

interface Props {
}

interface AddTodoInput {
    title: string
    checked: boolean
}

const AddTodo: FC<Props> = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<AddTodoInput>();
    const { supabase } = useSupabase()

    // Adding todo's to the database
    const onSubmit: SubmitHandler<AddTodoInput> = async ({ title, checked }) => {
        await supabase.from("todos").insert({
            user_id: (await supabase.auth.getUser()).data.user?.id!!,
            checked,
            title
        })

        reset()
    }

    return <form className="px-3 flex items-center" onSubmit={handleSubmit(onSubmit)}>
        <Checkbox className="bg-white" {...register("checked")} />
        <Input variant="ghost" placeholder="Add new todos..." {...register("title", { minLength: 3 })} />
        <input type="submit" hidden />
    </form>
}

export default AddTodo