import { Outlet } from "react-router-dom";
// import { AuthProvider } from "./providers/authProvider";
import { Flex, notification } from "antd";

export function Layout(){
    const [api] = notification.useNotification();
     return(
        <>
        <header>
            <Flex justify="space-between">
                
            <h1>login</h1>
            <h1>login</h1>
                
                
            </Flex>
        
        </header>
        <Outlet context={{notification : api}}/>
        </>
    )
}