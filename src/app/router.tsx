import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./layout";
import { ErrorPage } from "../pages/error";
import { Editor } from "../pages/editor/ui";

export const PATHS={
    MAIN:'/',
    LOGIN:'/login',
    ERROR:'/error',
    EDITOR:'/editor',
}

export const ALLOWED_PATHS = [PATHS.LOGIN, PATHS.ERROR]

export const router = createBrowserRouter([
    {
        path: PATHS.MAIN ,
        element:<Layout/>,
        children:[
            {
                path: PATHS.MAIN,
                lazy: async()=>{
                    const module = await import('../pages/main');
                    return {Component : module.MainPage};
                }
            }
        ]
    },
    // {
    //     path:PATHS.LOGIN,
    //     element:,
    // },
    {
        path:PATHS.EDITOR,
        lazy: async ()=>{
            const module = await import('../pages/editor/ui');
            return {Component : module.Editor}
        }
    },
    {
        path:PATHS.ERROR,
        element: <ErrorPage/>,

    }
])