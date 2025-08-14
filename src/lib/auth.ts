"use server"

import {User, UserInfo, UserLoginFormSate} from "../../types/user";
import {redirect} from "next/navigation";
import {loginUser} from "@/actions/auth-actions";
import {cookies} from "next/headers";

export async function handleLoginSubmit(
    prevState: UserLoginFormSate,
    formData: FormData
): Promise<UserLoginFormSate> {

    console.log("Server action called!");

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const errors: UserLoginFormSate['errors'] = prevState.errors || { email: '', password: '', invalidAuth: '' };

    console.log({ email, password });

    // Validation
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

    // Authentication
    try {
        const user: User = await loginUser({ email, password });
        console.log("User found:", user);

        // Set cookie
        (await cookies()).set('user', JSON.stringify(user), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 30,
        });

        console.log("User logged in successfully, redirecting...");

    } catch (error) {
        console.log("Login failed:", error);
        return {
            errors: {
                email: '',
                password: '',
                invalidAuth: 'Invalid email or password'
            }
        }
    }

    // Redirect outside of try-catch to avoid intercepting the redirect error
    redirect('/dashboard');
}

export const getUserInfoFromCookie = async (): Promise<UserInfo | null> => {

    const cookieStore = await cookies();
    const userCookie = await cookieStore.get('user');

    if (!userCookie) {
        return null;
    }

    return JSON.parse(userCookie.value) as UserInfo;
}
