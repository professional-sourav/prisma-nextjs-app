"use client"

import {useActionState} from "react";
import {logoutUser} from "@/actions/auth-actions";
import Form from "next/form";

export default function LogoutComponent() {

    const [
        state,
        formAction,
        isPending,
    ] = useActionState(logoutUser, null)

    return (
        <Form
            action={formAction}
            className="mt-8 space-y-6"
        >
            <button
                className="ml-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                disabled={isPending}
            >
                Logout
            </button>
        </Form>
    )
}