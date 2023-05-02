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
}

const AddTodo: FC<Props> = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<AddTodoInput>();
    const { supabase } = useSupabase()

    // Adding todo's to the database
    const onSubmit: SubmitHandler<AddTodoInput> = async ({ title }) => {
        await supabase.from("todos").insert({
            checked: false,
            user_id: (await supabase.auth.getUser()).data.user?.id!!,
            title
        })

        reset()
    }

    return <>
        <form className="px-3 flex items-center" onSubmit={handleSubmit(onSubmit)}>
            <Checkbox className="bg-white" />
            <Input variant="ghost" placeholder="Add new todos..." {...register("title")} />
            <input type="submit" hidden />
        </form>
    </>
}

export default AddTodo