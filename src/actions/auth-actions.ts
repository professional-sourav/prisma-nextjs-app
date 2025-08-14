"use server"

import {User, UserLogin} from "../../types/user";
import prisma from "@/lib/prisma";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export const loginUser = async (login: UserLogin): Promise<User> => {

    console.log("loginUser");

    const user = await prisma.user.findUnique({
        where: {
            email: login.email
        }
    })

    console.log(user);

    if (!user) {
        throw new Error("User not found");
    }

    if (user.password !== login.password) {
        throw new Error("Invalid password");
    }

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        password: user.password
    } as User;
};

export const logoutUser = async () => {
    const cookieStore = await cookies();
    await cookieStore.delete('user');

    console.log("User logged out successfully");

    redirect('/login');
}
