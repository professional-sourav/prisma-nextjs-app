"use client"

import {handleLoginSubmit} from "@/lib/auth";
import Form from "next/form";
import {useActionState} from "react";
import {UserLoginFormSate} from "../../types/user";

export default function LoginFormComponent() {

    const initialFormState: UserLoginFormSate = {
        errors: {
            email: '',
            password: '',
            invalidAuth: ''
        }
    }

    const [state, formAction, isPending] = useActionState(handleLoginSubmit, initialFormState)

    console.log(state.errors);

    return (
        <Form
            action={formAction}
            className="mt-8 space-y-6"
        >
            <div className="rounded-md shadow-sm -space-y-px">
                <div>
                    <label htmlFor="email" className="sr-only">
                        Email address
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Email address"
                        suppressHydrationWarning={true}
                    />
                    {state.errors.email && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
                    )}
                </div>
                <div>
                    <label htmlFor="password" className="sr-only">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        placeholder="Password"
                        suppressHydrationWarning={true}
                    />
                    {state.errors.password && (
                        <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
                    )}
                </div>
            </div>

            {state.errors.invalidAuth && (
                <div className="text-red-500 text-sm text-center">
                    {state.errors.invalidAuth}
                </div>
            )}

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        suppressHydrationWarning={true}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                    </a>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    disabled={isPending}
                    suppressHydrationWarning={true}
                >
                    {isPending ? 'Signing in...' : 'Sign in'}
                </button>
            </div>
        </Form>
    )
}