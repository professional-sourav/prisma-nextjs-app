import {User, UserLogin} from "../../types/user";
import prisma from "@/lib/prisma";

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