"use server"

import {UserLoginFormSate} from "../../types/user";
import {redirect} from "next/navigation";

export async function handleLoginSubmit(
    prevState: UserLoginFormSate,
    formData: FormData
): Promise<UserLoginFormSate> {

    console.log("Server action called!");

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const rememberMe = formData.get('remember-me');
    const errors: UserLoginFormSate['errors'] = prevState.errors || { email: '', password: '' };

    console.log({ email, password, rememberMe });

    if (!email) {
        errors.email = 'Email is required'
    }

    if (!password) {
        errors.password = 'Password is required'
    }

    if (errors.email || errors.password) {
        return {
            errors
        }
    }

    redirect('/dashboard');
}