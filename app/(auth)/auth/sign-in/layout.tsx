import React from "react";

const AuthLayout = ({children}:{children: React.ReactNode})=>{
    return(
        <main className="">
            {children}
        </main>
    )
}

export default AuthLayout