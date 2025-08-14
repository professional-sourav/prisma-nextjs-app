export type User = {
    id: string,
    email: string,
    name?: string | null,
    password: string,
    createdAt?: Date,
    updatedAt?: Date,
}

export type UserLogin = {
    email: string,
    password: string,
}

export type UserLoginFormSate = {
    errors: {
        email: string,
        password: string,
        invalidAuth?: string,
    }
}