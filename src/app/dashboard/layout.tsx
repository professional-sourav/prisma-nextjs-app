import React from "react";
import HeaderAuthComponent from "../../../components/auth/HeaderAuthComponent";
import '../../../global.css'
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export default function DashboardLayout({children}: { children: React.ReactNode}) {

    const userInfo = cookies().get('user');
    console.log(userInfo);

    if (!userInfo) {
        redirect('/login');
    }

    return (
        <html lang="en">
            <body>
            <header>
                <HeaderAuthComponent />
            </header>
                {children}
            </body>
        </html>
    )
}