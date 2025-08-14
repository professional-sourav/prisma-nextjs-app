import {getUserInfoFromCookie} from "@/lib/auth";
import Form from "next/form";
import LogoutComponent from "./LogoutComponent";

export default async function HeaderAuthComponent() {

    const userInfo = await getUserInfoFromCookie();

    return (
        <div className="flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-500">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{userInfo?.name}</h2>
            <LogoutComponent />
        </div>
    )
}